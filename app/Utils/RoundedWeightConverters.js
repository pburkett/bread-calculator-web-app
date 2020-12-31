
export const convertToOz = function (value) {
    //returns a single value rounded to two decimal places. input should be a number in grams.
    let x = value /= 28.3495
    return x.toFixed(5)
}

export const convertToGrams = function (value) {
    //returns a single value rounded to two decimal places. input should be a number in oz.
    let x = value *= 28.3495
    return x.toFixed(5)
}