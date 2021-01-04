import OrderFormController from "./Controllers/OrderFormController.js"
import FormController from "./Controllers/NewFormulaController.js"
import RecipeController from "./Controllers/RecipeController.js"
import NewShapeController from "./Controllers/NewShapeController.js"
import FormulaDisplayController from "./Controllers/FormulaDisplayController.js"

class App {
  formController = new FormController()
  orderFormController = new OrderFormController()
  recipeController = new RecipeController()
  newShapeController = new NewShapeController()
  formulaDisplayController = new FormulaDisplayController()
}

window["app"] = new App();
