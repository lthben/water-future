"use strict";

let qnIndex = 0;
const numQn = answers.length;
let isFirstTryCorrect = []; //score tracking
let userOptionSelections = []; //user selections tracking
const optionsArr = ["A", "B", "C", "D"]; //for the up down arrow keys tracking
let optionCheckedIndex = 0; //for the up down arrow keys tracking
let screens = {
  welcomeScreen: 0,
  questionScreen: 1,
  explanationScreen: 2,
  endScreen: 3,
};
let screen = screens.welcomeScreen;

function display_question() {
  screen = screens.questionScreen;
  $(".arrow-col").empty();

  $(".content").children().remove();

  const $html = `
            <div class="question-container"></div>
            <div class="options-container"></div>
            <div class="explanation-container"></div>
        `;
  $(".content").html($html);

  const $qndiv = $("<div>").addClass("qn-div").html(questions[qnIndex]);
  $(".question-container").append($qndiv);

  const _options = options[qnIndex]; //object containing one set of answer options pertaining to a question in key:value pairs
  const $form = $("<form>");

  for (const opt in _options) {
    const $html = `
            <label class="form-check-label" for="${opt}">
              <input class="form-check-input row" type="radio" name="option" id="${opt}" value="${opt}">
            ${opt}: ${_options[opt]}
            </label>
            `;
    const idName = `option${opt}`;
    const $div = $("<div>")
      .addClass("form-check")
      .attr("id", idName)
      .html($html);
    $form.append($div);
  }

  const $buttondiv = $("<div>").addClass("button-div");
  const $buttonhtml = `<button type="submit" class="btn btn-primary" id="submit-button">Submit</button>`;
  $buttondiv.html($buttonhtml);
  $form.append($buttondiv);
  $(".options-container").append($form);
  $("#A").prop("checked", true); //option A is checked by default
  $("#A").focus();
  optionCheckedIndex = 0;

  $("#submit-button").on("click", (e) => {
    e.preventDefault();
    setTimeout(() => {
      eval_user_sel();
    }, 300);
  });

  if (qnIndex <= userOptionSelections.length - 1) {
    //scroll back event to a previously completed question
    let optionChecked = userOptionSelections[qnIndex];
    $("#" + optionChecked).prop("checked", true);
    $("#" + optionChecked).focus();
    eval_user_sel();
  }
}

function eval_user_sel() {
  $(':input[type="submit"]').prop("disabled", true);
  $(':input[type="radio"]').prop("disabled", true);
  $(".button-div").remove();

  let optionSelected = $("input:checked").val();
  if (userOptionSelections.length <= qnIndex)
    userOptionSelections.push(optionSelected);
  let divIDname = "";
  let result = "";

  if (optionSelected !== answers[qnIndex]) {
    if (isFirstTryCorrect.length <= qnIndex) isFirstTryCorrect.push(false);

    divIDname = `#option${optionSelected}`;
    result = "&emsp;&emsp;&cross;";
    $(divIDname).css("border", "1px solid red");
    $(divIDname).css("background-color", "rgba(128,0,0,0.05)");
    $("label[for='" + optionSelected + "']").append(result);
    // console.log("wrong");
  } else {
    if (isFirstTryCorrect.length <= qnIndex) isFirstTryCorrect.push(true);
  }

  optionSelected = answers[qnIndex];
  divIDname = `#option${optionSelected}`;

  result = "&emsp;&emsp;&check;";
  $(divIDname).css("border", "1px solid green");
  $(divIDname).css("background-color", "rgba(0,128,0,0.05)");
  $("label[for='" + optionSelected + "']").append(result);
  // console.log("Correct");

  display_explanation();
}

function display_explanation() {
  screen = screens.explanationScreen;

  const $html = explanations[qnIndex];
  $(".explanation-container").html($html);

  const $buttondiv = $("<div>").addClass("button-div");
  const $buttonhtml = `<button type="submit" class="btn btn-primary" id="next-button">Next</button>`;
  $buttondiv.html($buttonhtml);
  $(".explanation-container").append($buttondiv);

  $("#next-button").on("click", (e) => {
    e.preventDefault();
    $(".content").children().children().remove();

    qnIndex++;
    if (qnIndex === numQn) {
      end_screen();
    } else {
      setTimeout(() => {
        display_question();
      }, 300);
    }
  });

  display_arrow_cols();
  if (qnIndex === 0) {
    $("#left-arrow-btn").remove();
  }
}

function welcome_screen() {
  screen = screens.welcomeScreen;
  $(".arrow-col").children().remove();

  const $starthtml = `
        <div id="mainTitle" class="pad-top">
          <h1> The Future of our Water </h1>
          <h4> Learn about water sustainability </h4>
        </div>
        <div class="row align-items-center">
          <img class="constrain-image-small pad-top" src='./media/E_SDG_action_card_square_6_small.jpg'/>
        </div>
        <div class="row horz-centre-text pad-top">
          <p>It is said that water is going to be the petroleum of the 21st century.</p> 
          <p>The demand for water - the life-sustaining natural resource with no substitute - continues to escalate at an unsustainable rate, due to population growth and industrial expansion. The world's finite supply is also shrinking due to pollution, draining of underground aquifers, and climate change. </p>
          <p>Learn more about this topic through this interactive quiz.</p>
          <p id="est-text">Estimated time to complete: 15 - 30min</p>
        </div>
        <div class="row" id="start-button-div"><button type="submit" class="btn btn-primary" id="start-button">Start</button>
        </div>
    `;
  $(".content").html($starthtml);

  $("#start-button").on("click", (e) => {
    e.preventDefault();
    display_question();
  });
}

function end_screen() {
  screen = screens.endScreen;
  $(".arrow-col").children().remove();

  const score = isFirstTryCorrect.filter((x) => x === true).length;

  const $endhtml = `
        <div id="mainTitle" class="pad-top">
          <h1> You have completed this quiz.</h1>
          <h4> Hope you learnt something interesting!</h4>
        </div>
        <div class="row align-items-center pad-top">
          <iframe width="100%" class="min-video-height" src="https://www.youtube.com/embed/C65iqOSCZOY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="row horz-centre-text pad-top">
          <p>You have got ${score} out of ${numQn} questions correct on the first attempt.</p> 
          <p>This 18 minute video - "World's Water Crisis", is a highly recommended watch about this topic.</p>
        </div>
        <div class="row pad-top" id="start-button-div"><button type="submit" class="btn btn-primary" id="start-button">Retake quiz</button>
        </div>
    `;
  $(".content").html($endhtml);
  $("#start-button").on("click", (e) => {
    e.preventDefault();
    qnIndex = 0;
    isFirstTryCorrect = [];
    userOptionSelections = [];
    welcome_screen();
  });
}

function updown_keypress_handler(keyID) {
  if (screen === screens.questionScreen) {
    if (keyID === 40) {
      //down
      optionCheckedIndex++;
      if (optionCheckedIndex === optionsArr.length) optionCheckedIndex = 0;
    } else if (keyID === 38) {
      //up
      optionCheckedIndex--;
      if (optionCheckedIndex === -1) optionCheckedIndex = optionsArr.length - 1;
    }

    let optionChecked = optionsArr[optionCheckedIndex];
    // console.log("optionChecked", optionChecked);
    $("#" + optionChecked).prop("checked", true);
    $("#" + optionChecked).focus();
  } else {
    if (keyID === 40) {
      //down
      window.scrollBy(0, 100);
    } else if (keyID === 38) {
      //up
      window.scrollBy(0, -100);
    }
  }
}

function leftright_keypress_handler(keyID) {
  if (keyID === 37) {
    qnIndex--;
    if (qnIndex === -1) {
      qnIndex = 0;
    } else {
      display_question();
    }
  } else if (keyID == 39) {
    qnIndex++;
    if (qnIndex === numQn) {
      end_screen();
    } else {
      display_question();
    }
  }
}

function display_arrow_cols() {
  const $html1 = `
    <div class="left-btn-div">  
      <button type="submit" class="btn" id="left-arrow-btn">
        <img class="arrow-img" src="./media/arrow-left.svg" />
      </button>
    </div>
      `;
  const $html2 = `
    <div class="right-btn-div">
      <button type="submit" class="btn" id="right-arrow-btn">
        <img class="arrow-img" src="./media/arrow-right.svg" />
      </button>
    </div>
      `;

  $(".content").prepend($html1);
  $(".content").append($html2);

  $("#left-arrow-btn").on("click", (e) => {
    e.preventDefault();
    leftright_keypress_handler(37);
  });

  $("#right-arrow-btn").on("click", (e) => {
    e.preventDefault();
    leftright_keypress_handler(39);
  });
}

function append_nav() {
  const $html = `
    <div class="nav-header">
      <p><strong>Water Future</strong></p>
      <p><small>30 min | 10 questions</small></p>
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 50%"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <div class="nav-body>
      <ol>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            >Disabled</a
          >
        </li>
      </ol>
    </div>
    `;

  $(".nav").html($html);
}

function assign_keypresses(e) {
  if (e.which === 38 || e.which === 40) {
    updown_keypress_handler(e.which);
  }

  if (screen === screens.welcomeScreen || screen === screens.endScreen) {
    if (e.which === 13) {
      $("#start-button").click();
    }
  } else if (screen === screens.questionScreen) {
    if (e.which === 13) {
      $("#submit-button").click();
    }
  } else if (screen === screens.explanationScreen) {
    switch (e.which) {
      case 13:
        $("#next-button").click();
        break;
      case 37:
      case 39: //left, right
        leftright_keypress_handler(e.which);
        break;
    }
  }
}

$(() => {
  $(document).on("keydown", (e) => {
    //use keydown instead of keypress
    e.preventDefault(); //prevents screen from auto-refreshing which causes the button to be submitted twice
    // console.log("e.which", e.which);
    assign_keypresses(e);
  });
  append_nav();
  display_arrow_cols();
  welcome_screen();
}); //end window onload
