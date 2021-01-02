import { doughShapeService } from "../Services/DoughShapeService.js"
import { ProxyState } from "../AppState.js"

function _draw() {
    let bgBool = true
    let formulas = [...ProxyState.formulas, ...ProxyState.defaultFormulas]
    let doughShapes = [...ProxyState.doughShapes, ...ProxyState.defaultDoughShapes]
    let template = `
    <div class="row my-2 justify-content-center">
        <h3 class="col text-center">Dough Shapes
        </h3>
    </div>
    <div class="row justify-content-center">
            <div class="align-items-center d-flex" id="table-header-formulas-container">
                <h3 id="table-header-formulas">Formulas
                </h3>
            </div>
            <div class="w-fit-content pl-0">
                <table class="table w-fit-content mb-0">
            
            
                    <thead id="form-shape-row">
                        <tr>
                            <th></th>`
    for (let index in doughShapes) {
        template += doughShapes[index].ColTemplate
    }
    template += `
                </tr>
            </thead>
            <form onsubmit="app.orderFormController.orderFormSubmit()" id="form1">
                <tbody>
        `
    for (let formulaIndex in formulas) {
        template += formulas[formulaIndex].RowTemplate(bgBool)
        bgBool = !bgBool
        for (let doughShapeIndex in doughShapes) {
            template += formulas[formulaIndex].InputTemplate(doughShapes[doughShapeIndex].id)
        }
    }
    template += `</tr>
                    
            </tbody>
            </form>
        </table>
    </div>
</div>
<div class="row justify-content-center mt-4">
<button type="submit" form="form1">Submit</button>
</div>`
    document.getElementById("app").innerHTML = template
    document.getElementById("page-header").innerText = 'Please fill out form below'


    localStorage.setItem("formulas", JSON.stringify(ProxyState.formulas))
    localStorage.setItem("doughShapes", JSON.stringify(ProxyState.doughShapes))
}

//  function _hoverEffects(){
//     let elems = document.getElementsByClassName('order-form-formula-header')
//     console.log(elems);
//     for (let i = 0; i < elems.length; i++){
//         console.log(i);
//          elems[i].addEventListener("mouseenter", function( event ) {
//             console.log(event.path[0].classList[1]);
//             document.getElementById(event.path[0].classList[1]).classList.remove("d-none")
//             $(`#${event.path[0].classList[1]}`).modal('show');
//          })
//          elems[i].addEventListener("mouseleave", function( event ) {
//             // document.getElementById(event.path[0].classList[1]).classList.add("d-none")
//          })
//         } 
            
        
//         }

export default class OrderFormController {
    constructor() {
        _draw()
        // _hoverEffects()
        ProxyState.on('formulas', _draw)
        ProxyState.on('doughShapes', _draw)
        ProxyState.on('defaultFormulas', _draw)
        ProxyState.on('defaultDoughShapes', _draw)

    }
    // takes in a form from the page, and organizes it into a POJO like this:
    // { formulaID-doughShapeID: quantity}
    orderFormSubmit() {

        console.log('form controller received form');
        let form = window.event.target
        event.preventDefault()
        let keysArr = document.getElementsByClassName("qty-input")
        let dataObj = {}

        for (let index in keysArr) {
            let key = keysArr[index].id
            if (key) {
                dataObj[key] = form[key].value
            }
        }
        form.reset()
        doughShapeService.calculateDoughWeights(dataObj)
    }

    deleteFormula(id) {
        if (window.confirm('Are you sure you want to delete this formula? This action cannot be undone.\nNote: Default formulas cannot be deleted permenantly.')) {
            ProxyState.formulas = ProxyState.formulas.filter(f => f.id != id)
            ProxyState.defaultFormulas = ProxyState.defaultFormulas.filter(f => f.id != id)
        }
    }
    deleteDoughShape(id) {
        if (window.confirm('Are you sure you want to delete this dough shape? This action cannot be undone. \nNote: Default dough shapes cannot be deleted permenantly.'))
            ProxyState.doughShapes = ProxyState.doughShapes.filter(d => d.id != id)
        ProxyState.defaultDoughShapes = ProxyState.defaultDoughShapes.filter(d => d.id != id)
    }
   
}

