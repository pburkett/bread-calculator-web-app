


export default class FormController {
    formSubmit() {
        console.log('form controller received form');
        let form = window.event.target
        event.preventDefault()
    }
}