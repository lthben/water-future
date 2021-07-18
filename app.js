'use strict'

let qnIndex = 0;
const numQn = answers.length;

function display_question() {
    
    const $qndiv = $('<div>').addClass('qn-div').html(questions[qnIndex]);
    $('.question-container').append($qndiv);

    const _options = options[qnIndex]; //object containing one set of answer options pertaining to a question in key:value pairs
    const $form = $('<form>');

    for (const opt in _options) {
        const $html = `
            <input class="form-check-input" type="radio" name="option" id="${opt}" value="${opt}">
            <label class="form-check-label" for="${opt}">
            ${opt}: ${_options[opt]}
            </label>
            `;
        const $div = $('<div>').addClass('form-check').html($html);
        $form.append($div);
    }
    
    const $buttondiv = $('<div>').addClass('button-div');
    const $buttonhtml = `<button type="submit" class="btn btn-primary" id="submit-button">Submit</button>`;
    $buttondiv.html($buttonhtml);
    $form.append($buttondiv);
    $('.options-container').append($form);
    
    $('#submit-button').on('click', (e) => {
        e.preventDefault();
        $('.result-container').children().remove();
        setTimeout(() => { 
            eval_user_sel();
        }, 300);
    }); 
}

function eval_user_sel() {

    let isCorrect = "";
    const $div = $('<div>');

    if ( $('input:checked').val() === answers[qnIndex] ) {
        isCorrect = "Correct";
        $(':input[type="submit"]').prop('disabled', true);
        $(':input[type="radio"]').prop('disabled', true);
        display_explanation();
    }
    else isCorrect = "Try Again";
    
    const $html = `<h3>${isCorrect}</h3>`;
    $div.html($html);
    $('.result-container').append($div);
}

function display_explanation() {
    const $div = $('<div>');
    const $html = `<h4>EXPLANATION</h4>`
    $div.html($html);
    $('.explanation-container').append($div);

    const $form = $('<form>');
    const $buttondiv = $('<div>').addClass('button-div');
    const $buttonhtml = `<button type="submit" class="btn btn-primary" id="next-button">Next</button>`;
    $buttondiv.html($buttonhtml);
    $form.append($buttondiv);
    $('.explanation-container').append($form);
    
    $('#next-button').on('click', (e) => {
        e.preventDefault();
        $('.container').children().children().remove();

        qnIndex++;
        if (qnIndex === numQn) console.log("finished"); 
        else {
            setTimeout(() => { 
                display_question();
            }, 300);
        }
    }); 
}

$(() => {

    display_question();
    
}); //end window onload
