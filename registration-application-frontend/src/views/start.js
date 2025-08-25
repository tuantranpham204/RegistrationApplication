const { JetView } = require('webix-jet');

module.exports = class StartView extends JetView {
  config() {
    return {
      rows: [
        { view: 'label', label: 'Welcome to the Dashboard (Placeholder)', align: 'center' },
        {
          view: 'button',
          value: 'Back to Login',
          click: () => this.app.show('/login')
        }
      ]
    };
  }
};