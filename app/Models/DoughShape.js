import { generateId } from "../Utils/GenerateId.js"

export default class DoughShape {
    constructor(name, doughWeight, descrip, id) {
        this.name = name
        this.doughWeight = doughWeight
        this.id = id || generateId()
        this.descrip = descrip || ''
    }
    get ColTemplate() {
        return `
        <th class="w-fit-content order-form-shape-header order-form-td"><button onclick="app.orderFormController.deleteDoughShape('${this.id}')" class="d-none fa fa-times bg-secondary mr-2" aria-hidden="true"></button>${this.name}</th>
        `
    }
}