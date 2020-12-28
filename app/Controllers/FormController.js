import { ProxyState } from "../AppState.js"
import { formulaService } from "../Services/FormulaService.js"
import { doughShapeService } from "../Services/DoughShapeService.js"
import Formula from "../Models/Formula.js"

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

    localStorage.setItem("formulas", JSON.stringify(ProxyState.formulas))
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
        console.log(dataObj);
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
        document.getElementById("ingredient-input-row").innerHTML += `
            <input form="formula-form" type="text" required id="ingredient-name-${ProxyState.ingredientInputNum}" placeholder="Ingredient Name" class="mb-2 ingredient-input">
            <input form="formula-form" type="number" id="ingredient-%-${ProxyState.ingredientInputNum}" placeholder="Ingredient Percentage" class="mb-2 ingredient-input">`
        ProxyState.ingredientInputNum++
    }
}