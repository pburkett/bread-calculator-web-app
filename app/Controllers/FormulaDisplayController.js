import { ProxyState } from "../AppState.js"
import Formula from "../Models/Formula.js"
import  { formulaService } from "../Services/FormulaService.js"
export default class FormulaDisplayController {
    constructor(){
        let allFormulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
        allFormulas.forEach(f => document.getElementById("main").innerHTML += f.displayTemplate())
        
    }
    editFormulaItemTemplate(formulaId, id, ind){
        console.log(formulaId, id, ind);
        let allFormulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
        let key = allFormulas.find(f => formulaId == f['id'])['list'].find(i => i.id == id)
        console.log(key);
        document.getElementById(`${ind}-${id}`).innerHTML = `
        <input form="edit-${formulaId}" id="${formulaId}-${id}-${ind}"  class="edit-formula-input form-edit-${formulaId}" value="${key[ind]}"></input>
        `
    }
    editFormula(id){
        event.preventDefault()
        let form = window.event.target
        let keysArray = document.getElementsByClassName(`form-edit-${id}`)
        let dataObj = {}
        for (let ind in keysArray) {
            if (keysArray[ind].id) {
            console.log('----');
            let key = keysArray[ind].id
            dataObj[form[key].id] = Number(form[key].value)
        }
    }
    formulaService.editFormula(id, dataObj)
    }
}