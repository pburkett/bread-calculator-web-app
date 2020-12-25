import { ProxyState } from "../AppState.js"
import Formula from "../Models/Formula.js"
import DoughShape from "../Models/DoughShape.js"
class FormulaService {
    constructor() {
        let formulaData = JSON.parse(localStorage.getItem("formulas"))
        console.log(formulaData);
        for (let index in formulaData) {
            let formula = formulaData[index]
            ProxyState.formulas = [...ProxyState.formulas, new Formula(formula.name, formula.flourList, formula.ingredientList, formula.id)]
        }

    }
    calculateRecipes(weightsData) {
        console.log('FormulaService.calculateRecipes data input: ', weightsData);


    }
}

export const formulaService = new FormulaService()