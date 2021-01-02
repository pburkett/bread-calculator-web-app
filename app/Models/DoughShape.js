import { generateId } from "../Utils/GenerateId.js"

export default class DoughShape {
    constructor(name, doughWeight, descrip, id) {
        this.name = name
        this.doughWeight = doughWeight
        this.id = id || generateId()
        this.descrip = descrip || ''
    }
    get ColTemplate() {
        return `
        <th class="w-fit-content order-form-shape-header order-form-td">
            ${this.displayTemplate()}
            <button onclick="app.orderFormController.deleteDoughShape('${this.id}')" class="d-none fa fa-times bg-secondary mr-2" aria-hidden="true"></button>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-${this.id}">
            ${this.name}
          </button>
            </th>
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