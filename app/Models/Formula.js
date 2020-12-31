import { generateId } from "../Utils/GenerateId.js"

export default class Formula {
    constructor(name, flourList, ingredientList, id) {
        this.name = name
        this.ingredientList = ingredientList
        this.flourList = flourList
        this.id = id || generateId()
    }
    get RowTemplate() {
        return `
        <tr>
            <td><button onclick="app.orderFormController.deleteFormula('${this.id}')" class="fa fa-times bg-secondary mr-2" aria-hidden="true"></button><b>${this.name}</b></td>`
    }
    InputTemplate(doughWeightID) {
        return `
        <td><input placeholder="qty" type="text" form="form1" class="qty-input bg-warning" id="${this.id}-${doughWeightID}"></td>
        `
    }
}