'use strict'

let qnIndex = 4;
const numQn = answers.length;
let isFirstTryCorrect = [];
let wrongOptionDivSelected = null; //DOM handle to reset the previous wrong selection
let wrongLabelText = null;
let wrongOptionID = null;

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
        const idName = `option${opt}`;
        const $div = $('<div>').addClass('form-check').attr('id', idName).html($html);
        $form.append($div);
    }

    const $buttondiv = $('<div>').addClass('button-div');
    const $buttonhtml = `<button type="submit" class="btn btn-primary" id="submit-button">Submit</button>`;
    $buttondiv.html($buttonhtml);
    $form.append($buttondiv);
    $('.options-container').append($form);

    $('#submit-button').on('click', (e) => {
        e.preventDefault();
        setTimeout(() => {
            eval_user_sel();
        }, 300);
    });
}

function eval_user_sel() {

    let result = "";
    const $div = $('<div>');
    $div.attr('id', 'result');

    $(wrongOptionDivSelected).css('background-color', 'azure');
    $(wrongOptionDivSelected).css('border', '1px solid azure');
    $("#" + wrongOptionID).next().html(wrongLabelText);

    let optionSelected = $('input:checked').val();
    let divIDname = `#option${optionSelected}`;
    let labelText = $("label[for='" + optionSelected + "']").text();
    console.log(labelText);

    // console.log($("input:checked").val());

    if (optionSelected === answers[qnIndex]) {
        result = "&check;";
        $(':input[type="submit"]').prop('disabled', true);
        $(':input[type="radio"]').prop('disabled', true);
        $('.button-div').remove();

        display_explanation();
        
        if (isFirstTryCorrect.length <= qnIndex) isFirstTryCorrect.push(true);
        $(divIDname).css('border', '1px solid green');
        $(divIDname).css('background-color', 'rgba(0,128,0,0.05)');
    }
    else {
        wrongOptionDivSelected = divIDname;
        wrongLabelText = labelText;
        wrongOptionID = optionSelected;
        if (isFirstTryCorrect.length <= qnIndex) isFirstTryCorrect.push(false);
        result = "&cross;";
        $(divIDname).css('border', '1px solid red');
        $(divIDname).css('background-color', 'rgba(128,0,0,0.05)');
    }

    $("#" + optionSelected).next().html(labelText + "&emsp;" + result);
}

function display_explanation() {
    const $html = explanations[qnIndex];
    $('.explanation-container').html($html);

    const $buttondiv = $('<div>').addClass('button-div');
    const $buttonhtml = `<button type="submit" class="btn btn-primary" id="next-button">Next</button>`;
    $buttondiv.html($buttonhtml);
    $('.explanation-container').append($buttondiv);

    $('#next-button').on('click', (e) => {
        e.preventDefault();
        $('.container').children().children().remove();

        wrongOptionDivSelected = null; 
        wrongLabelText = null;
        wrongOptionID = null;

        qnIndex++;
        if (qnIndex === numQn) {
            end_screen();
        } else {
            setTimeout(() => {
                display_question();
            }, 300);
        }
    });
}

function welcome_screen() {

    const $starthtml = `
        <div id="mainTitle">
        <h1> The Future of our Water </h1>
        <h4> Learn about water sustainability </h4>
        </div>
        <div class="row align-items-center pad-top">
            <div class="col-lg-6"><img class="constrain-image" src='./media/Goal 6/E_SDG_action_card_square_6_small.jpg'/></div>
            <div class="col-lg-6">
                <div class="row horz-centre-text pad-top">
                    <p>It is said that water is going to be the petroleum of the 21st century.</p> 
                    <p>The demand for water - the life-sustaining natural resource with no substitute - continues to escalate at an unsustainable rate, due to population growth and industrial expansion.</p> 
                    <p>The world's finite supply is also shrinking due to pollution, draining of underground aquifers, and climate change. </p>
                    <p>Learn more about this topic through this interactive quiz.</p>
                    <p id="est-text"><br />Estimated time: 30 - 45min<p>
                </div>
                <div class="row">
                    <div id="start-button"><button type="submit" class="btn btn-primary" id="next-button">Start</button></div>
                </div>
            </div>
        </div>
    `
    $('.container').html($starthtml);
    $('#next-button').on('click', (e) => {
        e.preventDefault();
        $('.container').children().remove();

        const $html = `
            <div class="question-container"></div>
            <div class="options-container"></div>
            <div class="explanation-container row"></div>
        `
        $('.container').html($html);

        display_question();
    });
}

function end_screen() {

    const score = isFirstTryCorrect.filter(x => x === true).length;

    const $endhtml = `
        <div id="mainTitle">
        <h1> You have completed this quiz.</h1>
        <h4> Hope you learnt something interesting!</h4>
        </div>
        <div class="row align-items-center">
            <div class="col-lg-6"><iframe width="100%" height="315" src="https://www.youtube.com/embed/C65iqOSCZOY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <div class="col-lg-6">
                <div class="row horz-centre-text pad-top">
                    <p>You have got ${score} out of ${numQn} questions correct on the first attempt.</p> 
                    <p>This 18 minute video "World's Water Crisis", is a highly recommended watch about this topic.</p>
                </div>
                <div class="row">
                    <div id="start-button"><button type="submit" class="btn btn-primary" id="next-button">Retake quiz</button></div>
                </div>
            </div>
        </div>
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
