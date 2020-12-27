import { ProxyState } from "../AppState.js"

import Recipe from "../Models/Recipe.js"

class RecipeController {
    constructor() {
    }

    draw() {
        let template = `<div class="row d-flex my-4 justify-content-around">
    `
        for (let index in ProxyState.recipes) {
            template += ProxyState.recipes[index].Template
        }
        template += `</div>`

        document.getElementById("app").innerHTML = template
        document.getElementById("page-header").innerText = 'Recipes'
    }
}
export const recipeController = new RecipeController()