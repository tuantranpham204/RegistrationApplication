import { JetView } from "webix-jet";

export default class ForgotPassword extends JetView {
  constructor(app, data) {
    super(app);
    this._componentData = data;
  }
  config() {
    

    return {
      view: "form",
      id: "forgot_password_form",
      width: 700,
      elements: [
        { view: "text", label: "New Password", name: "email" },
        { view: "text", type: "Confirm Password", label: "Password", name: "password" },
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
