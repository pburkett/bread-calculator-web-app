import { ProxyState } from "../AppState.js"
import Formula from "../Models/Formula.js"
import DoughShape from "../Models/DoughShape.js"
import { formulaService } from "./FormulaService.js"
class DoughShapeService {
    constructor() {
        let doughShapeData = JSON.parse(localStorage.getItem("doughShapes"))
        for (let index in doughShapeData) {
            let doughShape = doughShapeData[index]
            ProxyState.doughShapes = [...ProxyState.doughShapes, new DoughShape(doughShape.name, doughShape.doughWeight, doughShape.id)]
        }
    }
    calculateDoughWeights(dataObj) {
        //iterates over all input data from the page, then compiles it into 1 vweight value per formula. the data looks like this:
        // { formulaID: totalWeight}

        let weightsData = {}
        let doughShapes = [...ProxyState.doughShapes, ...ProxyState.defaultDoughShapes]

        for (let key in dataObj) {
            let arr = key.split('-')
            let formulaKey = arr[0]
            let shapeKey = arr[1]
            let shapeInMem = doughShapes.find(s => s.id == shapeKey)
            if (!weightsData[formulaKey]) {
                weightsData[formulaKey] = 0
            }
            weightsData[formulaKey] += shapeInMem.doughWeight * dataObj[key]

        }

        formulaService.calculateRecipes(weightsData)
    }
    shapeFormSubmit({ name, descrip, weight, unitIsGrams }) {
        if (unitIsGrams == 'false') {
            weight *= 28.35
            weight.toFixed(2)

        }
        ProxyState.doughShapes = [...ProxyState.doughShapes, new DoughShape(name, weight, descrip)]
    }
}
export const doughShapeService = new DoughShapeService()