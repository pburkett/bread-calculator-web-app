import { ProxyState } from "../AppState.js"
import Formula from "../Models/Formula.js"

export default class FormulaDisplayController {
    constructor(){
        let allFormulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
        allFormulas.forEach(f => document.getElementById("main").innerHTML += f.displayTemplate())
        
    }
    editFormulaItemTemplate(formulaId, ind, ind1, HTMLid){
        let allFormulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
        let key = allFormulas.find(f => formulaId == f['id'])['list'][ind][ind1]
        document.getElementById(HTMLid).innerHTML = `
        <input form="edit-${formulaId}" class="edit-formula-input" value="${key}"></input>
        `
    }
    editFormula(){
        console.log('h');
    }
}