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
  if (qnIndex === 0 && userOptionSelections.length === 0) display_navbar(); //setup once only

  //shift to the right to cater for fixed position nav bar
  $(".left-arrow-col").removeClass("col-xl-3");
  $(".left-arrow-col").addClass("col-xl-4");
  $(".right-arrow-col").removeClass("col-xl-3");
  $(".right-arrow-col").addClass("col-xl-2");

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

  //update progress bar();
  let w = userOptionSelections.length * 10;
  $(".progress-bar").css("width", `${w}%`);
  $(".progress-bar").attr("aria-valuenow", `${w}`);

  $("#nav-item-" + qnIndex).prop("disabled", false);
}

function display_explanation() {
  screen = screens.explanationScreen;

  const $html = explanations[qnIndex];
  $(".explanation-container").html($html);

  display_arrow_cols();
  if (qnIndex === 0) {
    $("#left-arrow-btn").remove();
  }
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

function display_navbar() {
  //d-none d-xl-flex col-xl-2
  let $html = `
  <div class="d-xl-flex col-xl-2 fixed-top flex-column bg-dark navbar-dark collapse" id="navbarToggleExternalContent">
    <div class="navbar-brand">
      <p id="strong-txt">Water Future</p>
      <p id="small-txt">30 min | 10 questions</p>
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 0%"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <div class="nav-body">
      <button class="btn nav-link" type="button" id="nav-item-0" disabled>${titles[0]}</button>
      <button class="btn nav-link" type="button" id="nav-item-1" disabled>${titles[1]}</button>
      <button class="btn nav-link" type="button" id="nav-item-2" disabled>${titles[2]}</button>
      <button class="btn nav-link" type="button" id="nav-item-3" disabled>${titles[3]}</button>
      <button class="btn nav-link" type="button" id="nav-item-4" disabled>${titles[4]}</button>
      <button class="btn nav-link" type="button" id="nav-item-5" disabled>${titles[5]}</button>
      <button class="btn nav-link" type="button" id="nav-item-6" disabled>${titles[6]}</button>
      <button class="btn nav-link" type="button" id="nav-item-7" disabled>${titles[8]}</button>
      <button class="btn nav-link" type="button" id="nav-item-8" disabled>${titles[7]}</button>
      <button class="btn nav-link" type="button" id="nav-item-9" disabled>${titles[9]}</button>
    </div>
  </div>
  `;
  $(".main-body").prepend($html);

  $(".nav-body").on("click", (e) => {
    e.preventDefault();
    // console.log(e.target.id);
    let idStr = e.target.id;
    let idNum = idStr.match(/\d+/g); //extract the number in nav-item-#
    if (
      idNum !== null &&
      idNum < userOptionSelections.length &&
      idNum != qnIndex
    ) {
      qnIndex = idNum;
      display_question();
      console.log("idNum: ", idNum);
      console.log("userOptionsSelection.length: ", userOptionSelections.length);
    }
  });

  setup_nav_btn();
}

function setup_nav_btn() {
  const $html = `
    <nav class="navbar navbar-expand-xl navbar-light bg-none">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="true" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      </div>
    </nav>
  `;

  $("#nav-btn-div").append($html);

  $("body").on("click", (e) => {
    e.preventDefault();
    $(".collapse").collapse("hide");
    // console.log(e.target);
  });
}

$(() => {
  $(document).on("keydown", (e) => {
    //use keydown instead of keypress
    e.preventDefault(); //prevents screen from auto-refreshing which causes the button to be submitted twice
    // console.log("e.which", e.which);
    assign_keypresses(e);
  });
  welcome_screen();
});
