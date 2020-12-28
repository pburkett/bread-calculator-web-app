import { ProxyState } from "../AppState.js"
import { formulaService } from "../Services/FormulaService.js"
import { doughShapeService } from "../Services/DoughShapeService.js"
import Formula from "../Models/Formula.js"

export default class NewFormulaController {
    constructor() {
    }

    formulaFormSubmit() {
        let form = window.event.target
        event.preventDefault()

        let dataObj = {
            metaData: { name: form['formula-name'].value, descrip: form['descrip'].value }, flourList: [], ingredientList: []
        }
        let totalFlourPercentage = 0
        let keysArr = document.getElementsByClassName("flour-input")
        for (let i = 0; i < keysArr.length / 2; i++) {
            console.log(form[`flour-name-${i}`]);
            if (form[`flour-name-${i}`] && form[`flour-%-${i}`]) {
                dataObj.flourList.push({
                    flourName: form[`flour-name-${i}`].value, flourPercentage: Number(form[`flour-%-${i}`].value)
                })
                totalFlourPercentage += Number(form[`flour-%-${i}`].value)
            } else {
                window.alert('Data Invalid! ln 80')
                return
            }
        }
        if (totalFlourPercentage != 100) {
            window.alert('Data Invalid! The sum of all flour percentages must be 100! ln 85')
            return
        }

        keysArr = document.getElementsByClassName("ingredient-input")

        for (let i = 0; i < keysArr.length / 2; i++) {
            if (keysArr[i] && keysArr[i + 1]) {
                dataObj.ingredientList.push({
                    ingredientName: form[`ingredient-name-${i}`].value, ingredientPercentage: Number(form[`ingredient-%-${i}`].value)
                })

            } else {
                window.alert('Data Invalid! ln 93')
                return
            }

        }
        form.reset()

        $("#formulaModal").modal('hide');

        ProxyState.formulas = [...ProxyState.formulas, new Formula(dataObj.metaData.name, dataObj.flourList, dataObj.ingredientList)]

    }

    addFlourInput() {
        let targetElem = document.getElementById("flour-input-row")
        let str = `<div class="row justify-content-between">
                        <input form = "formula-form" type = "text" required id = "flour-name-${ProxyState.flourInputNum}" placeholder = "Flour Name" class="mb-2 flour-input">
                        <input form="formula-form" type="number" id="flour-%-${ProxyState.flourInputNum}" placeholder="Flour Percentage" class="mb-2 flour-input">
                        </div>`
        targetElem.insertAdjacentHTML('beforebegin', str);
        ProxyState.flourInputNum++
    }
    addIngredientInput() {
        let targetElem = document.getElementById("ingredient-input-row")
        let str = `<div class="row justify-content-between">
                        <input form="formula-form" type="text" required id="ingredient-name-${ProxyState.ingredientInputNum}" placeholder="Ingredient Name" class="mb-2 ingredient-input">
                        <input form="formula-form" type="number" id="ingredient-%-${ProxyState.ingredientInputNum}" placeholder="Ingredient Percentage" class="mb-2 ingredient-input">
                    </div>`
        targetElem.insertAdjacentHTML('beforebegin', str);
        ProxyState.ingredientInputNum++
    }
}