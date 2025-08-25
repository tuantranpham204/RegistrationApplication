const { JetApp } = require("webix-jet");
const { webix } = require("webix");

global.webix = webix;

class App extends JetApp {
  constructor(config) {
    const defaults = {
      id: "registration-app",
      start: "/login",
      views: {
      // login: callback => require.ensure([], () => callback(null, require('jet-views/login')), 'login'),
      // forgot: callback => require.ensure([], () => callback(null, require('jet-views/forgot')), 'forgot'),
      // register: callback => require.ensure([], () => callback(null, require('jet-views/register')), 'register'),
      // top: callback => require.ensure([], () => callback(null, require('jet-views/top')), 'top'),
      // start: callback => require.ensure([], () => callback(null, require('jet-views/start')), 'start')
    },
    };
    super({ ...defaults, ...config });
  }
}


try {
  webix.ready(() => new App().render())
} catch (e) {
  console.error('Render error:', e)
}

module.exports = {App}