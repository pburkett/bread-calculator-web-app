import { ProxyState } from "../AppState.js"
import { formulaService } from "../Services/FormulaService.js"
import { doughShapeService } from "../Services/DoughShapeService.js"

function _draw() {
    let template = `<table class="table">
            <thead>
                <tr>
                    <th></th>`
    for (let index in ProxyState.doughShapes) {
        template += ProxyState.doughShapes[index].ColTemplate
    }
    template += `
                </tr>
            </thead>
            <form onsubmit="app.formController.orderFormSubmit()" id="form1">
                <tbody>
        `
    for (let formulaIndex in ProxyState.formulas) {
        template += ProxyState.formulas[formulaIndex].RowTemplate
        for (let doughShapeIndex in ProxyState.doughShapes) {
            template += ProxyState.formulas[formulaIndex].InputTemplate(ProxyState.doughShapes[doughShapeIndex].id)
        }
    }
    template += `</tr>
                <td>
                    <button type="submit" form="form1">Submit</button>
                </td>        
            </tbody>
            </form>
        </table>`
    document.getElementById("app").innerHTML = template
    document.getElementById("page-header").innerText = 'Please fill out form below'
}

export default class FormController {
    constructor() {
        _draw()
        ProxyState.on('formulas', _draw)
        var inputNum = 1
    }

    orderFormSubmit() {
        //takes in a form from the page, and organizes it into a POJO like this:
        // { formulaID-doughShapeID: quantity}
        console.log('form controller received form');
        let form = window.event.target
        event.preventDefault()
        let keysArr = document.getElementsByClassName("qty-input")
        let dataObj = {}

        for (let index in keysArr) {
            let key = keysArr[index].id
            if (key) {
                dataObj[key] = form[key].value
            }
        }
        form.reset()
        doughShapeService.calculateDoughWeights(dataObj)
    }

    formulaFormSubmit() {
        let form = window.event.target
        event.preventDefault()
        let keysArr = document.getElementsByClassName("flour-input")
        let dataObj = {
            metaData: { name: form['formula-name'].value, descrip: form['descrip'].value }, flourList: [], ingredientList: []
        }
        let j = 0
        for (let i = 0; i < keysArr.length; i += 2) {
            if (keysArr[i].value && Number(keysArr[j + 1].value)) {
                dataObj.flourList.push({
                    name: form[`flour-name-${j}`].value, percentage: form[`flour-%-${j}`].value
                })
                j++
            } else {
                window.alert('Data Invalid!')
                return
            }
        }
        keysArr = document.getElementsByClassName("ingredient-input")
        j = 0
        for (let i = 0; i < keysArr.length; i += 2) {
            if (keysArr[i].value && Number(keysArr[j + 1].value)) {
                dataObj.ingredientList.push({
                    name: form[`ingredient-name-${j}`].value, percentage: form[`ingredient-%-${j}`].value
                })
                j++
            } else {
                window.alert('Data Invalid!')
                return
            }
        }
        form.reset()
        console.log(dataObj);
        $("#formulaModal").modal('hide');
    }

    addFlourInput() {
        document.getElementById("flour-input-row").innerHTML += `
                <input form = "formula-form" type = "text" id = "flour-name-${ProxyState.flourInputNum}" placeholder = "Flour Name" class="mb-2 flour-input">
                    <input form="formula-form" type="text" id="flour-%-${ProxyState.flourInputNum}" placeholder="Flour Percentage" class="mb-2 flour-input">`
        ProxyState.flourInputNum++
    }
    addIngredientInput() {
        document.getElementById("ingredient-input-row").innerHTML += `
            <input form="formula-form" type="text" id="ingredient-name-${ProxyState.ingredientInputNum}" placeholder="Ingredient Name" class="mb-2 ingredient-input">
            <input form="formula-form" type="text" id="ingredient-%-${ProxyState.ingredientInputNum}" placeholder="Ingredient Percentage" class="mb-2 ingredient-input">`
        ProxyState.ingredientInputNum++
    }
}