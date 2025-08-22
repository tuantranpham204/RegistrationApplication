import { JetView } from "webix-jet";

export default class Register extends JetView {
  constructor(app, data) {
    super(app);
    this._componentData = data;
  }
  config() {
    return {
      view: "form",
      id: "register_form",
      width: 700,
      elements: [
        { view: "text", label: "Username", name: "username" },
        { view: "text", label: "Email", name: "email" },
        { view: "text", type: "Password", label: "Password", name: "password" },
        {
          margin: 5,
          cols: [
            { view: "button", value: "Login", css: "webix_primary" },
            { view: "button", value: "Cancel" },
          ],
        },
      ],
    };
  }
}
