'use strict'

let qnIndex = 0;
let score = 0;

$(() => {

    const $qndiv = $('<div>');
    $('.questionBox').append($qndiv).html(questions[qnIndex]);

    const _options = options[qnIndex]; //object containing one set of answer options pertaining to a question in key:value pairs

    for (const opt in _options) {
        const $html = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault${opt}">
            <label class="form-check-label" for="flexRadioDefault${opt}">
            ${opt}: ${_options[opt]}
            </label>
            `;
        const $div = $('<div>').addClass('form-check').html($html);
        $('.answerBox').append($div);
    }

    const $button = `<button type="button" class="btn btn-primary">Submit</button>`
    $('.answerBox').append($button);
}); //end window onload
