
import Formula from "./Models/Formula.js"
import DoughShape from "./Models/DoughShape.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { generateId } from "./Utils/GenerateId.js"

class AppState extends EventEmitter {
  defaultFormulas = [new Formula("Default - Whole Wheat Bread",
    [{ "flourName": "whole wheat flour", "flourPercentage": 50, id: generateId() }, { "flourName": "bread flour", "flourPercentage": 50, id: generateId() }],
    [{ "ingredientName": "water", "ingredientPercentage": 60, id: generateId() }, { "ingredientName": "salt", "ingredientPercentage": 2, id: generateId() }, { "ingredientName": "yeast", "ingredientPercentage": 3, id: generateId() }]), new Formula(
      "Default - Ciabatta", [{ "flourName": "white flour", "flourPercentage": 90, id: generateId() }, { "flourName": "bread flour", "flourPercentage": 10, id: generateId() }], [{
        "ingredientName": "water", "ingredientPercentage": 69, id: generateId()
      }, { "ingredientName": "salt", "ingredientPercentage": 2, id: generateId() }, { "ingredientName": "yeast", "ingredientPercentage": 1, id: generateId() }])]
  defaultDoughShapes = [new DoughShape("Default - Pan Loaf", 1000), new DoughShape("Default - Baguette", 750)]
  formulas = []
  doughShapes = []
  recipes = []

  flourInputNum = 0
  ingredientInputNum = 0
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
