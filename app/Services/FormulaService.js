import { ProxyState } from "../AppState.js"
import Formula from "../Models/Formula.js"
import DoughShape from "../Models/DoughShape.js"
import Recipe from "../Models/Recipe.js"
import RecipeController from "../Controllers/RecipeController.js"

class FormulaService {
    constructor() {
        let formulaData = JSON.parse(localStorage.getItem("formulas"))
        for (let index in formulaData) {
            let formula = formulaData[index]
            ProxyState.formulas = [...ProxyState.formulas, new Formula(formula.name, formula.flourList, formula.ingredientList, formula.id)]
        }

    }
    calculateRecipes(weightsData) {
        console.log('FormulaService.calculateRecipes data input: ', weightsData);
        for (let key in weightsData) {
            let recipeData = {}

            let formula = ProxyState.formulas.find(f => f.id == key)
            let flourList = formula.flourList
            let ingredientList = formula.ingredientList

            recipeData['metaData'] = { formulaName: formula.name, formulaId: formula.id }
            recipeData['flourList'] = []
            recipeData['ingredientList'] = []

            //calculates the total percentage of the non - flour ingredients
            //total ingredient percentage is set to 100 to account for the flour percentage
            var totalIngredientPercentage = 100
            for (let index in ingredientList) {
                totalIngredientPercentage += ingredientList[index]['ingredientPercentage']
            }
            let totalFlourWeight = weightsData[key] / totalIngredientPercentage * 100

            //loop sets individual weights for each flour in the flour list
            for (let index in flourList) {
                let flourWeight = (totalFlourWeight * flourList[index]['flourPercentage'] / 100).toFixed(2)
                recipeData['flourList'].push({ name: flourList[index]['flourName'], weight: flourWeight })
            }

            //loop sets individual weights for each ingredient in the ingredient list
            for (let index in ingredientList) {
                let ingredientWeight = (totalFlourWeight * ingredientList[index]['ingredientPercentage'] / 100).toFixed(2)
                recipeData['ingredientList'].push({ name: ingredientList[index]['ingredientName'], weight: ingredientWeight })
            }

            recipeData['metaData']['totalWeight'] = weightsData[key]
            console.log(recipeData);
            ProxyState.recipes = [...ProxyState.recipes, new Recipe(recipeData)]



        }


    }
}
export const formulaService = new FormulaService()