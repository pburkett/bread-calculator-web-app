export const removeWhiteSpace = function (str) {
    //removes whitespace from the beggining and end of a string, and removes double whitespace throughout
    //courtesy of Farzi < 3
    while (str[0] == " ") {
        str = str.slice(1)
    }
    while (str[-1] == " ") {
        str = str.slice(-1)
        return str
    }
}
//TODO test this!