import { JetView } from "webix-jet";

export default class Register extends JetView {
  constructor(app, data) {
    super(app);
    this._componentData = data;
  }
  config() {
    return {
      rows: [
        { view: 'label', label: 'Registration Page (Placeholder)', align: 'center' },
        {
          view: 'button',
          id: 'backToLoginBtn',
          value: 'Back to Login',
        },
      ],
    };
  }
  init() {
    $$('backToLoginBtn').attachEvent("onItemClick", (id,e) => {
      this.app.show('/login')
    })
  }
}
