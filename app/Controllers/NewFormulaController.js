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
        if (!form['formula-name'].value) {
            window.alert('Data invalid! A name is required!')
            return
        }
        let dataObj = {
            metaData: { name: form['formula-name'].value, descrip: form['descrip'].value }, flourList: [], ingredientList: []
        }
        let totalFlourPercentage = 0
        let keysArr = document.getElementsByClassName("flour-input")
        for (let i = 0; i < keysArr.length / 2; i++) {
            console.log(form[`flour-name-${i}`].value);
            if (form[`flour-name-${i}`].value && form[`flour-%-${i}`].value) {
                dataObj.flourList.push({
                    flourName: form[`flour-name-${i}`].value, flourPercentage: Number(form[`flour-%-${i}`].value)
                })
                totalFlourPercentage += Number(form[`flour-%-${i}`].value)
            } else if (!(form[`flour-name-${i}`].value || form[`flour-%-${i}`].value)) {

            } else {
                window.alert('Data invalid! All flour entries must have a name and percentage!')
                return
            }
        }
        if (totalFlourPercentage != 100) {
            window.alert('Data Invalid! The sum of all flour percentages must be 100!')
            return
        }

        keysArr = document.getElementsByClassName("ingredient-input")

        for (let i = 0; i < keysArr.length / 2; i++) {
            if (form[`ingredient-name-${i}`].value && form[`ingredient-%-${i}`].value) {
                dataObj.ingredientList.push({
                    ingredientName: form[`ingredient-name-${i}`].value, ingredientPercentage: Number(form[`ingredient-%-${i}`].value)
                })

            } else {
                window.alert('Data Invalid! All ingredient entries must have a name and percentage.')
                return
            }

        }
        form.reset()

        $("#formulaModal").modal('hide');
        let arr = ProxyState.formulas
        arr.push(new Formula(dataObj.metaData.name, dataObj.flourList, dataObj.ingredientList))
        console.log(dataObj);
        ProxyState.formulas = arr

        // the page reload is here to reset the number of entry fields in the form. I swear, its not me being lazy!
        // location.reload()

    }



    addFlourInput() {

        let targetElem = document.getElementById(`flour-input-row-${ProxyState.flourInputNum}`)
        ProxyState.flourInputNum++
        let str = `<div class="row justify-content-between" id="flour-input-row-${ProxyState.flourInputNum}">
                        <input form = "formula-form" type = "text" id = "flour-name-${ProxyState.flourInputNum}" placeholder = "Flour Name" class="mb-2 flour-input">
                        <input form="formula-form" type="number" id="flour-%-${ProxyState.flourInputNum}" placeholder="Flour Percentage" class="mb-2 flour-input">
                        </div>`
        targetElem.insertAdjacentHTML('afterend', str)

    }
    addIngredientInput() {
        let targetElem = document.getElementById(`ingredient-input-row-${ProxyState.ingredientInputNum}`)
        ProxyState.ingredientInputNum++
        let str = `<div class="row justify-content-between" id="ingredient-input-row-${ProxyState.ingredientInputNum}">
                        <input form="formula-form" type="text" id="ingredient-name-${ProxyState.ingredientInputNum}" placeholder="Ingredient Name" class="mb-2 ingredient-input">
                        <input form="formula-form" type="number" id="ingredient-%-${ProxyState.ingredientInputNum}" placeholder="Ingredient Percentage" class="mb-2 ingredient-input">
                    </div>`
        targetElem.insertAdjacentHTML('afterend', str);

    }
}