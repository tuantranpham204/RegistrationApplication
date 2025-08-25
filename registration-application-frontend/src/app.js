import "./styles/app.css"
import "babel-polyfill"

import { JetApp, JetView, plugins, StoreRouter, HashRouter } from "webix-jet"

const isValidSession = () => {
	const session = webix.storage.session.get("session")
	return session && session.token && session.uid && (new Date(session.expires) > new Date())
}

const clearViewBeforeLogout = () => {
	document.querySelectorAll('div.webix_view.webix_layout_line').forEach(el => {
		el.remove()
	})
	
	for (let key of Object.keys(webix.ui.views)) {
		if (webix.ui.views[key] && webix.ui.views[key].destructor) {
		webix.ui.views[key].destructor()
	}}
}
class Refresh extends JetView {
	config() {
		return {}
	}
	ready() {
		webix.ajax("api/cat/refresh").then(data => {
			webix.alert(data.text()).then(() => { this.show("/top/home") })
		})
	}
}
class Logout extends JetView {
	config() {
		return {}
	}
	init() {
		clearViewBeforeLogout()
	}
	ready() {
		webix.storage.session.clear()
		window.location.replace(`/`)
	}
}
export default class App extends JetApp {
  constructor(config) {
    const defaults = {
      id: "registration-app",
      router: HashRouter,
			debug: false,
			start: "/login",
			views: {
				refresh: Refresh,
				logout: Logout
			}
    };
    super({ ...defaults, ...config })
  }
}


webix.ready(() => {
	const app = new App()
	app.attachEvent("app:guard", (url, view, nav) => {
		if (url !== "/login") {
			if (!isValidSession()) nav.redirect = "/login"
		}
	})
	webix.attachEvent("onBeforeAjax", (mode, url, data, req, headers, files, promise) => {
		const session = webix.storage.session.get("session")
		if (session) headers["Authorization"] = 'Bearer ' + session.token
	})
	webix.attachEvent("onAjaxError", (req) => {
		if (req.status == 403) app.show("/top/home")
		if (req.status == 409) {
			clearViewBeforeLogout()
			app.show("/login")
		}
		if (req.responseType === "blob") {
			const reader = new FileReader()
			reader.onloadend = (e) => webix.message(reader.result, "error")
			reader.readAsText(req.response)
		}
		else if (req.responseText) webix.message(req.responseText, "error")
	})
	app.render()
})