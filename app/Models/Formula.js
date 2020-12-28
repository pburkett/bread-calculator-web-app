import { generateId } from "../Utils/GenerateId.js"

export default class Formula {
    constructor(name, flourList, ingredientList, id) {
        this.name = name
        this.id = id || generateId()
        this.ingredientList = ingredientList
        this.flourList = flourList
        console.log(this.ingredientList);
    }
    get RowTemplate() {
        return `
        <tr>
            <td>${this.name}</td>`
    }
    InputTemplate(doughWeightID) {
        return `
        <td><input placeholder="qty" type="text" form="form1" class="qty-input bg-warning" id="${this.id}-${doughWeightID}"></td>
        `
    }
}