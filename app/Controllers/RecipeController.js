import { ProxyState } from "../AppState.js"
import { convertToGrams, convertToOz } from "../Utils/RoundedWeightConverters.js"

function _draw() {
    let template = `<div class="row d-flex my-4 justify-content-around">
    `
    for (let index in ProxyState.recipes) {
        template += ProxyState.recipes[index].Template
    }
    template += `</div>`

    document.getElementById("app").innerHTML = template
    document.getElementById("page-header").innerText = 'Recipes'
}
export default class RecipeController {
    constructor() {
        ProxyState.on('recipes', _draw)
    }
    changeUnit(recipeId, itemName, unit) {

        console.log(recipeId);
        console.log(itemName);
        console.log(unit);


        if (unit == 'grams') {
            let address = ProxyState.recipes.find(r => r.recipeId == recipeId).list.find(i => i.name == itemName)
            address.unit = 'oz'
            address.weight = convertToOz(address.weight)
            ProxyState.recipes = ProxyState.recipes
        } else if (unit == 'oz') {
            let address = ProxyState.recipes.find(r => r.recipeId == recipeId).list.find(i => i.name == itemName)
            address.unit = 'grams'
            address.weight = convertToGrams(address.weight)
            ProxyState.recipes = ProxyState.recipes
        }
    }
    changeDefaultUnit(recipeId, unit) {
        let targetRecipe = ProxyState.recipes.find(r => r.recipeId == recipeId)
        targetRecipe.list.forEach(item => {
            if (item.unit == unit) {
                this.changeUnit(recipeId, item.name, unit)
            }
        })
        let r = ProxyState.recipes.find(r => r.recipeId == recipeId)
        if (unit == 'grams') {
            r.totalWeight = convertToOz(r.totalWeight)
            r.defaultUnit = 'oz'
        } else if (unit == 'oz') {
            r.totalWeight = convertToGrams(r.totalWeight)
            r.defaultUnit = 'grams'
        } else {
            throw new Error('conversion error - line 57');
        }
        ProxyState.recipes = ProxyState.recipes
    }
}
