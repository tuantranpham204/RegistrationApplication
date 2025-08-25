const { JetView } = require('webix-jet');

module.exports = class TopView extends JetView {
  config() {
    return {
      rows: [
        { view: 'toolbar', elements: [{ view: 'label', label: 'Dashboard' }] },
        { $subview: true }
      ]
    };
  }
};