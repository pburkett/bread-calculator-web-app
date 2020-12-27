// import ValuesController from "./Controllers/ValuesController.js";
import FormController from "./Controllers/FormController.js"
import { recipeController } from "./Controllers/RecipeController.js"

class App {
  // valuesController = new ValuesController();
  formController = new FormController()

}

window["app"] = new App();
