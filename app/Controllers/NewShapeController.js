import { ProxyState } from "../AppState.js"
import { doughShapeService } from "../Services/DoughShapeService.js"
export default class NewShapeController {
    constructor() {
    }

    shapeFormSubmit() {
        console.log('shapecontroller received form');
        let form = window.event.target
        event.preventDefault()
        if (!form['shape-name'].value || !form['shape-weight'].value) {
            window.alert('Data Invalid! Both a name and weight are required.')
            return
        }
        let dataObj = {
            name: form['shape-name'].value,
            descrip: form['shape-descrip'].value,
            weight: form['shape-weight'].value,
            unitIsGrams: `${document.querySelector('input[name="unit-btns"]:checked').value}`

        }
        form.reset()
        $("#doughShapeModal").modal('hide');;
        doughShapeService.shapeFormSubmit(dataObj)

    }

}