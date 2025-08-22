import { JetView } from "webix-jet";
import { login } from "../apis/authApis";

export default class Login extends JetView {
  constructor(app, data) {
    super(app);
    this._componentData = data;
    
  }
  config() {
    return {
      view: "form",
      id: "login_form",
      width: 700,
      elements: [
        { view: "text", label: "Email", name: "email" },
        { view: "text", type: "Password", label: "Password", name: "password" },
        {
          margin: 5,
          cols: [
            { view: "button", id:"loginBtn", value: "Login", css: "webix_primary" },
            { view: "button", id: "loginCancelBtn",value: "Cancel" },
            { view: "button", value: "Forgot Password" }
          ],
        },
      ],
    };
  }
  init() {
    $$("loginBtn").attachEvent("onItemClick", async(id, e) => {
        const value = $$("login_form").getValues()
        const res = await login(value)
        console.log(res)
        
    });

    $$("loginCancelBtn").attachEvent("onItemClick", (id,e) => {
        $$("login_form").clear()
    })

    
  }
}
