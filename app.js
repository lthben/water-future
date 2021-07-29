'use strict'

let qnIndex = 0;
const numQn = answers.length;
let isFirstTryCorrect = [];

function display_question() {
    
    const $qndiv = $('<div>').addClass('qn-div').html(questions[qnIndex]);
    $('.question-container').append($qndiv);

    const _options = options[qnIndex]; //object containing one set of answer options pertaining to a question in key:value pairs
    const $form = $('<form>');

    for (const opt in _options) {
        const $html = `
            <input class="form-check-input row" type="radio" name="option" id="${opt}" value="${opt}">
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
        if (isFirstTryCorrect.length <= qnIndex ) isFirstTryCorrect.push(true);
    }
    else {
        if (isFirstTryCorrect.length <= qnIndex ) isFirstTryCorrect.push(false);
        isCorrect = "Try Again";
    }
    const $html = `<h3>${isCorrect}</h3>`;
    $div.html($html);
    $('.result-container').append($div);
}

function display_explanation() {
    const $div = $('<div>');
    const $html = explanations[qnIndex];
    $div.html($html);
    $('.explanation-container').append($div);

    const $buttondiv = $('<div>').addClass('button-div');
    const $buttonhtml = `<button type="submit" class="btn btn-primary" id="next-button">Next</button>`;
    $buttondiv.html($buttonhtml);
    $('.explanation-container').append($buttondiv);
    
    $('#next-button').on('click', (e) => {
        e.preventDefault();
        $('.container').children().children().remove();

        qnIndex++;
        if (qnIndex === numQn) {
            end_screen();
            // const timeSpent = Date.now() - start;
            // console.log(Math.round(timeSpent/1000) + " seconds spent");
        } else {
            setTimeout(() => { 
                display_question();
            }, 300);
        }
    }); 
}

function welcome_screen() {

    const $starthtml = `
        <h1> The Future of our Water </h1>
        <b> Learn about water sustainability </b><br />
        <img src="./media/water-as-petroleum.png" /> <br />
        <p>We will learn about why the above quote about water is true, via an interactive quiz of ${numQn} questions."</p>
        <img src='./media/Goal 6/E_SDG_action_card_square_6.jpg' />
        <p>This topic is closely related to the United Nations Sustainable Development Goal 6 'Clean Water and Sanitation'</p>
        <button type="submit" class="btn btn-primary" id="next-button">Start</button>
    `
    $('.container').html($starthtml);
    $('#next-button').on('click', (e) => {
        e.preventDefault();
        $('.container').children().remove();

        const $html = `
            <div class="question-container"></div>
            <div class="options-container"></div>
            <div class="result-container"></div>
            <div class="explanation-container"></div>
        `
        $('.container').html($html);

        display_question();
    });
}

function end_screen() {

    const score = isFirstTryCorrect.filter(x => x===true).length;

    const $endhtml = `
        <p> Thank you for spending time on this quiz. Hope you learnt something interesting! </p>
        <p> You have got ${score} out of ${numQn} questions correct on the first attempt.</p>
        <p> The following 18 minute video is a highly recommended watch about this topic. </p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/C65iqOSCZOY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <br />
        <button type="submit" class="btn btn-primary" id="next-button">Retake quiz</button>
    `
    $('.container').html($endhtml);
    $('#next-button').on('click', (e) => {
        e.preventDefault();
        qnIndex = 0;
        isFirstTryCorrect = [];
        welcome_screen();
    });
}

$(() => {
    welcome_screen();
}); //end window onload
