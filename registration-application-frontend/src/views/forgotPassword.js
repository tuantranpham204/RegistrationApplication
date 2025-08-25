import { JetView } from 'webix-jet';

export default class ForgotPasswordView extends JetView {
  config() {
    return {
      rows: [
        { view: 'label', label: 'Forgot Password Page (Placeholder)', align: 'center' },
        {
          view: 'button',
          value: 'Back to Login',
          //click: () => this.app.show('/login'),
        },
      ],
    };
  }
}