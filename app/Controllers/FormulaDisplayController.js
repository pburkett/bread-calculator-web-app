import { ProxyState } from "../AppState.js"
import Formula from "../Models/Formula.js"
import  { formulaService } from "../Services/FormulaService.js"

function _drawModals(){
    let allFormulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
    let template = ''
    allFormulas.forEach(f => template += f.displayTemplate())
    document.getElementById("formula-display-modals").innerHTML = template
}
export default class FormulaDisplayController {
    constructor(){
        _drawModals()
        ProxyState.on("formulas", _drawModals)        
        ProxyState.on("defaultFormulas", _drawModals)    
    }

    editFormulaItemTemplate(formulaId, id, ind){
        
        let allFormulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
        let key = allFormulas.find(f => formulaId == f['id'])['list'].find(i => i.id == id)
        console.log(`${ind}-${id}`);
        document.getElementById(`${ind}-${id}`).innerHTML = `
        <input form="edit-${formulaId}" id="${formulaId}-${id}-${ind}"  class="edit-formula-input form-edit-${formulaId}" value="${key[ind]}"></input>
        `
    }
    clearEditInput(formulaId, id, ind){
        let allFormulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
        let formula = allFormulas.find(f => formulaId == f['id'])
        let key = formula['list'].find(i => i.id == id)
        console.log(formula.displayItemTemplate(id,ind));
        document.getElementById(`${ind}-${id}`).innerHTML = formula.displayItemTemplate(id,ind)
    }
    editFormula(id){
        $(`#modal-${id}`).modal('hide');
        event.preventDefault()
        let form = window.event.target
        let keysArray = document.getElementsByClassName(`form-edit-${id}`)
        let dataObj = {}
        for (let ind in keysArray) {
            if (keysArray[ind].id) {
            let key = keysArray[ind].id
            dataObj[form[key].id] = form[key].value
            
            let keys = form[key].id.split('-')
            console.log(keys[0], keys[1], keys[2]);
            
        }
    }
    console.log(dataObj);
    formulaService.editFormula(id, dataObj)
    
    }
}