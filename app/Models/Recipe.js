import { generateId } from "../Utils/GenerateId.js"

export default class Recipe {
    constructor({ metaData, flourList, ingredientList, recipeId }) {
        this.formulaName = metaData.formulaName
        this.formulaId = metaData.formulaId // this probably isnt needed
        this.totalWeight = metaData.totalWeight
        this.list = [...flourList, ...ingredientList]
        this.recipeId = recipeId || generateId()
        this.defaultUnit = 'grams'

    }
    get Template() {
        let trClassBool = false
        let rowNum = 1
            // let tdClassBool = false
        let template = /*html*/ `
        <div class="col-5 bg-primary mx-2 mb-5 mt-3 text-success">
        <div class="row justify-content-center m-2 mt-3 bg-success text-primary">
            <div class="col-12 mt-3">
                <h4 class="text-center">${this.formulaName}</h4>
            </div>
            <div class="col-12 mt-3">
                <h5 class="text-center">Total Weight: ${this.weightDisplay(this.totalWeight, this.defaultUnit)}</h5>
            </div>
        </div>
            <div class="row">
                <h5 onclick="app.recipeController.changeDefaultUnit('${this.recipeId}','${this.defaultUnit}')" class="cursor-pointer ml-5">Change all units</h5>
                <i class="fa fa-hand-pointer-o ml-3" aria-hidden="true"></i>
            </div>
            <table class="mx-auto mb-4">
                <tbody>`

        for (var i = 0; i < this.list.length; i++) {
            template += `
            <tr class=" text-primary ${trClassBool ? 'bg-secondary':'bg-success'}">
            <td><h3 class="ml-4">${rowNum}</h3></td>
                <td class="pr-3 custom-table-data-left font-larger">${this.list[i].name}</td>
                <td class="pl-3 cursor-pointer custom-table-data-right font-larger" onclick="app.recipeController.changeUnit('${this.recipeId}', '${this.list[i].name}','${this.list[i].unit}')"> ${this.weightDisplay(this.list[i].weight, this.list[i].unit)}</td>
                <td><i onclick="app.recipeController.changeUnit('${this.recipeId}', '${this.list[i].name}','${this.list[i].unit}')" class="cursor-pointer pr-4 fa fa-hand-pointer-o" aria-hidden="true"></i></td>
            </tr>`

            trClassBool = !trClassBool
            rowNum++
        }
        template += `</tbody></table></div>`
        return template
    }
    weightDisplay(value, unit) {
        //takes in a  (number) value and a (string) unit pertaining to that value, and returns a string to display the weight in multiple sizes for ease of reading.
        let x = ''
        if (unit == 'oz') {
            if (value >= 16) {
                x = (value / 16).toFixed(0).toString()
                x += ' Pounds, '
            }
            console.log(x);
            x += (value % 16).toFixed(2).toString()
            x += ' Ounces'
        } else if (unit == 'grams') {
            if (value >= 1000) {
                x = (value / 1000).toFixed(0).toString()
                x += ' Kilograms, '
            }
            x += (value % 1000).toFixed(0).toString()
            x += ' Grams'
        }
        return x
    }
}