import { generateId } from "../Utils/GenerateId.js"

export default class DoughShape {
    constructor(name, doughWeight, id) {
        this.name = name
        this.doughWeight = doughWeight
        this.id = id || generateId()
    }
    get ColTemplate() {
        return `
        <th>${this.name}</th>
        `
    }
}