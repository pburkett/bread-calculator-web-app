import { ProxyState } from "../AppState.js"
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


}
