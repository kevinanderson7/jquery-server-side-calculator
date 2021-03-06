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
  getEquation();
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
  $('#total').text('');
}
function calculate() {
  firstNum = $('#jsInputNumOne').val();
  secondNum = $('#jsInputNumTwo').val();

  if (
    firstNum == undefined ||
    secondNum == undefined ||
    firstNum == '' ||
    secondNum == '' ||
    equation.math == 0
  ) {
    alert('Please input numbers for calculation');
    return false;
  } else {
    // firstNum = $('#jsInputNumOne').val();
    // secondNum = $('#jsInputNumTwo').val();
    console.log(firstNum);
    console.log(secondNum);
    equation.num1 = firstNum;
    equation.num2 = secondNum;
    //   equation.answer = equation.num1 + equation.math + equation.num2;
    //   equation.answer = eval(equation.answer);
    console.log(equation);
    postEquation();
  }
}

function postEquation() {
  $.ajax({
    method: 'POST',
    url: '/equation',
    data: equation,
  }).then((response) => {
    console.log('post equation: ', response);
  });
  getEquation();
}

function getEquation() {
  $.ajax({
    type: 'GET',
    url: '/equation',
  }).then((response) => {
    console.table(response);
    render(response);
  });
}

function render(history) {
  $('#jsInputNumOne').val('');
  $('#jsInputNumTwo').val('');

  $('#history').empty();
  for (let equation of history) {
    equation.answer = formatNumber(equation.answer);
    $('#history').append(
      `<li>${equation.num1} ${equation.math} ${equation.num2} = ${equation.answer}</li>`
    );
    equation.answer = formatNumber(equation.answer);

    $('#total').text(`${equation.answer}`);
  }
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
