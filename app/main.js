import OrderFormController from "./Controllers/OrderFormController.js"
import FormController from "./Controllers/NewFormulaController.js"
import RecipeController from "./Controllers/RecipeController.js"
import NewShapeController from "./Controllers/NewShapeController.js"

class App {
  formController = new FormController()
  orderFormController = new OrderFormController()
  recipeController = new RecipeController()
  newShapeController = new NewShapeController()
}

window["app"] = new App();
