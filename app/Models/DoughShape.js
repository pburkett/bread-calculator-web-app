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
        <th>${this.name}</th>
        `
    }
}