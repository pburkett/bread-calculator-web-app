import { generateId } from "../Utils/GenerateId.js"


export default class Formula {
    constructor(name, flourList, ingredientList, id) {
        this.name = name
        this.ingredientList = ingredientList
        this.flourList = flourList
        this.id = id || generateId()
        this.list = [...this.flourList, ...this.ingredientList]
        
        console.log([...this.flourList, ...this.ingredientList]);
    }
    RowTemplate(bgBool) {

        return /*html*/`
        <tr class="${bgBool ? 'bg-success' : 'bg-secondary'}">
        
            <td class="order-form-formula-header ${this.id}">
                <button onclick="app.orderFormController.deleteFormula('${this.id}')" class="d-none fa fa-times bg-secondary  mr-2" aria-hidden="true"></button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-${this.id}">
            ${this.name}
          </button></td>`
    }
    InputTemplate(doughWeightID) {
        return `
        <td class="order-form-td"><input placeholder="qty" type="text" form="form1" class="qty-input" id="${this.id}-${doughWeightID}"></td>
        `
    }
    displayTemplate(){
        return  `<div class="modal fade" id="modal-${this.id}" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="bg-primary text-success modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${this.name}</h5>
              <p>Click item to edit</p>
            </div>
            <div class="modal-body container d-flex justify-content-center">
              ${this.tableTemplate()}
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" form="edit-${this.id}" class="btn-warning">Submit Changes</button>
            </div>
          </div>
        </div>
      </div>`
    }
    tableTemplate(){
      let tdClassBool = false
        let trClassBool = false
        let template = /*html*/`
        <div class="d-flex h-50 bg-secondary justify-self-center">
        <table>
        <form id="edit-${this.id}" onsubmit="app.formulaDisplayController.editFormula('${this.id}')">
        <tbody>`

            for (let ind in this.list){
                template += `<tr class="text-primary ${trClassBool ? 'bg-secondary':'bg-success'}">`
                trClassBool = !trClassBool
                for (let ind1 in this.list[ind]) {
                  if (ind1 != 'id') {
  
                  
                  
                template += `<td id="${ind1}-${this.list[ind].id}" class="${tdClassBool ? 'custom-table-data-right': 'custom-table-data-left'}">
                              <h4 onclick="app.formulaDisplayController.editFormulaItemTemplate('${this.id}','${this.list[ind].id}', '${ind1}')" class="cursor-pointer formula-table-text">${this.list[ind][ind1]}</h4>
                              </td>`
                tdClassBool = !tdClassBool
              }
            } template += `</tr>`
        }
            template +=`
            </tbody>
            </form>
            </table>
            </div>
        `
        return template
    }
}