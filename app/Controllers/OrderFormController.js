import { doughShapeService } from "../Services/DoughShapeService.js"
import { ProxyState } from "../AppState.js"

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
            <form onsubmit="app.orderFormController.orderFormSubmit()" id="form1">
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
    localStorage.setItem("doughShapes", JSON.stringify(ProxyState.doughShapes))
}


export default class OrderFormController {
    constructor() {
        _draw()
        ProxyState.on('formulas', _draw)
        ProxyState.on('doughShapes', _draw)

    }
    //takes in a form from the page, and organizes it into a POJO like this:
    // { formulaID-doughShapeID: quantity}
    orderFormSubmit() {

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

