import { JetView } from "webix-jet";

export default class Home extends JetView {
  constructor(app, data) {
    super(app);
    this._componentData = data;
  }
  config() {
    return {
      view:"template",
      content:"myDiv"
    };

    return [
        
    ]
  }

  init() {
    
  }
}
