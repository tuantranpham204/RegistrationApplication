import { JetView } from "webix-jet"

export default class Login extends JetView {
  constructor(app, data) {
    super(app);
    this._componentData = data;
  }
  config() {
    return {
      view: "form",
      id: "loginForm",
      width: 400,
      elements: [
        { view: "text", label: "Email", name: "email", labelWidth: 100 },
        {
          view: "text",
          label: "Password",
          name: "password",
          type: "password",
          labelWidth: 100,
        },
        {
          cols: [
            {
              view: "button",
              value: "Login",
              css: "webix_primary",
              click: () => this.handleLogin(),
            },
            {
              view: "button",
              value: "Cancel",
              click: () => this.$$("loginForm").clear(),
            },
          ],
        },
        {
          cols: [
            {
              view: "button",
              value: "Forgot Password",
              type: "link",
              click: () => this.app.show("/forgot"),
            },
            {
              view: "button",
              value: "Register",
              type: "link",
              click: () => this.app.show("/register"),
            },
          ],
        },
      ],
    };
  }
  init() {
    
  }
}
