$(document).ready(init);

equation = {
  num1: null,
  math: 0,
  num2: null,
  answer: null,
};

let firstNum = $('#jsInputNumOne').val();
let secondNum = $('#jsInputNumTwo').val();

function init() {
  $('#additionButton').on('click', clickAddition);
  $('#subtractionButton').on('click', clickSubtraction);
  $('#multiplyButton').on('click', clickMultiply);
  $('#divisionButton').on('click', clickDivison);
  $('#equalsButton').on('click', calculate);
  $('#clearButton').on('click', clickClear);
}

function clickAddition() {
  equation.math = '+';
  console.log(equation);
}

function clickSubtraction() {
  equation.math = '-';
  console.log(equation);
}
function clickMultiply() {
  equation.math = '*';
  console.log(equation);
}
function clickDivison() {
  equation.math = '/';
  console.log(equation);
}
function clickClear() {
  firstNum = $('#jsInputNumOne').val('');
  secondNum = $('#jsInputNumTwo').val('');
  equation.math = 0;
}
function calculate() {
  firstNum = $('#jsInputNumOne').val();
  secondNum = $('#jsInputNumTwo').val();
  console.log(firstNum);
  console.log(secondNum);
  equation.num1 = firstNum;
  equation.num2 = secondNum;
  equation.answer = equation.num1 + equation.math + equation.num2;
  equation.answer = eval(equation.answer);
  console.log(equation);

  $.ajax({
    method: 'POST',
    url: '/equation',
    data: equation,
  }).then((response) => {
    console.log(response);
  });
}

function getEquation() {
  $.ajax({
    type: 'GET',
    url: '/equation',
  }).then((response) => {
    console.table(response);
  });
}
