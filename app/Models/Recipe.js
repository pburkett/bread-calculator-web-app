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
        let template = /*html*/`
        <div class="col-3 bg-primary mx-2">
            <h4 class="text-center">${this.formulaName}</h4>
            <h5 class="text-center">Total Weight: ${this.weightDisplay(this.totalWeight, this.defaultUnit)}</h5>
            <div class="row ">
                <h5 class="ml-2">Change unit:</h5>
                <input onclick="app.recipeController.changeDefaultUnit('${this.recipeId}','${this.defaultUnit}')" ${this.defaultUnit == 'oz' ? 'checked' : ''} type="checkbox" class="ml-2"></input>
            </div>`

        for (var i = 0; i < this.list.length; i++) {
            template += `
            <div class="cursor-pointer" onclick="app.recipeController.changeUnit('${this.recipeId}', '${this.list[i].name}', '${this.list[i].unit}')">${this.list[i].name}  - ${this.weightDisplay(this.list[i].weight, this.list[i].unit)}
                    
            </div>`
        }
        template += `</div>`
        return template
    }
    weightDisplay(value, unit) {
        //takes in a  (number) value and a (string) unit pertaining to that value, and returns a string to display the weight in multiple units for ease of reading.


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

