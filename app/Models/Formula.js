import { generateId } from "../Utils/GenerateId.js"

export default class Formula {
    constructor(name, flourList, ingredientList, id) {
        this.name = name
        this.ingredientList = ingredientList
        this.flourList = flourList
        this.id = id || generateId()

    }
    RowTemplate(bgBool) {

        return /*html*/`
        <tr class="${bgBool ? 'bg-success' : 'bg-secondary'}">
        
            <td class="order-form-formula-header ${this.id}">${this.displayTemplate()}
                <button onclick="app.orderFormController.deleteFormula('${this.id}')" class="d-none fa fa-times bg-secondary  mr-2" aria-hidden="true"></button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-${this.id}">
            ${this.name}
          </button></td>`
    }
    InputTemplate(doughWeightID) {
        return `
        <td class="order-form-td"><input placeholder="qty" type="text" form="form1" class="qty-input " id="${this.id}-${doughWeightID}"></td>
        `
    }
    displayTemplate(){
        return  `<div class="modal fade" id="modal-${this.id}" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`
    }
}