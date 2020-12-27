import { generateId } from "../Utils/GenerateId.js"

export default class Recipe {
    constructor({ metaData, flourList, ingredientList, recipeId }) {
        this.formulaName = metaData.formulaName
        this.formulaId = metaData.formulaId
        this.totalWeight = metaData.totalWeight
        this.list = [...ingredientList, ...flourList]
        this.recipeId = recipeId || generateId()
        console.log(this.formulaName);
        console.log(this.ingredientList);
    }

    get Template() {

        let template = /*html*/`
        <div class="col-3 bg-primary mx-2">
            <h4 class="text-center">${this.formulaName}</h4>
            <h5 class="text-center">Total Weight: ${this.totalWeight}</h5>
            `

        for (var i = 0; i < this.list.length; i++) {
            template += `
            <div>${this.list[i].name}  -  ${this.list[i].weight}
            </div>`
        }


        template += `</div>`


        return template
    }
}