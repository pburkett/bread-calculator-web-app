import { generateId } from "../Utils/GenerateId.js"

export default class Formula {
    constructor(name, flourList, ingredientList, id) {
        this.name = name
        this.ingredientList = ingredientList
        this.flourList = flourList
        this.id = id || generateId()

    }
    RowTemplate(bgBool) {

        return `
        <tr class="${bgBool ? 'bg-success' : 'bg-secondary'}">
            <td class="order-form-formula-header"><button onclick="app.orderFormController.deleteFormula('${this.id}')" class="d-none fa fa-times bg-secondary mr-2" aria-hidden="true"></button><b>${this.name}</b></td>`
    }
    InputTemplate(doughWeightID) {
        return `
        <td class="justify-content-center order-form-td"><input placeholder="qty" type="text" form="form1" class="qty-input m4-auto" id="${this.id}-${doughWeightID}"></td>
        `
    }
}