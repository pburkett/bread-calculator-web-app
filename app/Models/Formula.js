import { generateId } from "../Utils/GenerateId.js"

export default class Formula {
    constructor(name, flourList, ingredientList, id) {
        this.name = name
        this.id = generateId() || id
        this.ingredientList = ingredientList
        this.flourList = flourList
    }
}