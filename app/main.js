// import ValuesController from "./Controllers/ValuesController.js";
import FormController from "./Controllers/FormController.js"

class App {
  // valuesController = new ValuesController();
  formController = new FormController()
}

window["app"] = new App();
