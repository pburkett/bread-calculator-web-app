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
            <form onsubmit="app.formController.formSubmit()" id="form1">
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
}

export default class FormController {
    constructor() {
        _draw()
    }

    formSubmit() {
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
}