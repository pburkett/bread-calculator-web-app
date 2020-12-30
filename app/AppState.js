
import Formula from "./Models/Formula.js"
import DoughShape from "./Models/DoughShape.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  defaultFormulas = [new Formula("Default - Whole Wheat Bread",
    [{ "flourName": "whole wheat flour", "flourPercentage": 50 }, { "flourName": "bread flour", "flourPercentage": 50 }],
    [{ "ingredientName": "water", "ingredientPercentage": 60 }, { "ingredientName": "salt", "ingredientPercentage": 2 }, { "ingredientName": "yeast", "ingredientPercentage": 3 }])]
  defaultDoughShapes = [new DoughShape("Default - Pan Loaf", 1000)]
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
