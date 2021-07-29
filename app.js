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

    let result = "";
    const $div = $('<div>');
    $div.attr('id','result');
    
    if ( $('input:checked').val() === answers[qnIndex] ) {
        result = "&check;";
        $(':input[type="submit"]').prop('disabled', true);
        $(':input[type="radio"]').prop('disabled', true);
        display_explanation();
        if (isFirstTryCorrect.length <= qnIndex ) isFirstTryCorrect.push(true);
        // $div.css('background-color', 'rgba(0,128,0,0.3)');
        $div.css('border','2px solid green');
        $div.css('background-color','rgba(0,128,0,0.05)');
    }
    else {
        if (isFirstTryCorrect.length <= qnIndex ) isFirstTryCorrect.push(false);
        result = "&cross;";
        // $div.css('background-color', 'rgba(128,0,0,0.3)');
        $div.css('border','2px solid red');
        $div.css('background-color','rgba(128,0,0,0.05)');
    }

    const $html = `<h3>${result}</h3>`;
    $div.append($html);
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
        <div id="mainTitle">
        <h1> The Future of our Water </h1>
        <h4> Learn about water sustainability </h4>
        </div>
        <div class="row align-items-center">
            <div class="col-6"><img src='./media/Goal 6/E_SDG_action_card_square_6.jpg' width="100%"/></div>
            <div class="col-6">
                <div class="row horz-centre-text">
                    <p>It is said that water is going to be the petroleum of the 21st century. The demand for water - the life-sustaining natural resource with no substitute - continues to escalate at an unsustainable rate, due to population growth and industrial expansion.</p> 
                    <p>The world's finite supply is also shrinking due to pollution, draining of underground aquifers, and climate change. Learn more about this topic through this interactive quiz.</p>
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
        <div id="mainTitle">
        <h1> You have completed this quiz.</h1>
        <h4> Hope you learnt something interesting!</h4>
        </div>
        <div class="row align-items-center">
            <div class="col-6"><iframe width="560" height="315" src="https://www.youtube.com/embed/C65iqOSCZOY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <div class="col-6">
                <div class="row horz-centre-text">
                    <p>You have got ${score} out of ${numQn} questions correct on the first attempt.</p> 
                    <p>This 18 minute video is a highly recommended watch about this topic.</p>
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
