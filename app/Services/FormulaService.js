import { ProxyState } from "../AppState.js"
import Formula from "../Models/Formula.js"
import Recipe from "../Models/Recipe.js"

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
            let formulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
            let formula = formulas.find(f => f.id == key)
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
                recipeData['flourList'].push({ name: flourList[index]['flourName'], weight: flourWeight, unit: 'grams' })
            }

            //loop sets individual weights for each ingredient in the ingredient list
            for (let index in ingredientList) {
                let ingredientWeight = (totalFlourWeight * ingredientList[index]['ingredientPercentage'] / 100).toFixed(2)
                recipeData['ingredientList'].push({ name: ingredientList[index]['ingredientName'], weight: ingredientWeight, unit: 'grams' })
            }

            recipeData['metaData']['totalWeight'] = weightsData[key]
            console.log(recipeData);
            ProxyState.recipes = [...ProxyState.recipes, new Recipe(recipeData)]
        }
    }

    editFormula(id, dataObj) {

        let allFormulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
        let toBeEdited = allFormulas.find(f => f.id == id)

        // iterate over the object keys in our edit data
        for (let ind in Object.keys(dataObj)) {
            // build an array with 3 strings: formula id, item id, and name || percentage
            let keysArr = Object.keys(dataObj)[ind].split('-')

            // alias the value to be injected
            let val = dataObj[Object.keys(dataObj)[ind]]

            // cast our data into a Number() only if the location is a percentage
            if (keysArr[2] == 'ingredientPercentage' || keysArr[2] == 'flourPercentage') {
                val = Number(val)
            }
            // assign the new values into the formula object in memory
            toBeEdited.list.find(i => i.id == keysArr[1])[keysArr[2]] = val
            ProxyState.defaultFormulas = ProxyState.defaultFormulas

        }
    }
    deleteFormula(id) {
        ProxyState.formulas = ProxyState.formulas.filter(f => f.id != id)
        ProxyState.defaultFormulas = ProxyState.defaultFormulas.filter(f => f.id != id)
    }
}
export const formulaService = new FormulaService()