const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(5000, () => {
  console.log('Listening on port 5000');
});

const equationHistory = [];

app.get('/equation', (req, res) => {
  res.send(equationHistory);
});
app.post('/equation', (req, res) => {
  const equation = req.body;
  console.log(equation.answer);

  equation.answer =
    parseInt(equation.num1) + equation.math + parseInt(equation.num2);
  console.log(equation.answer);
  console.log(equation.math);
  if (equation.math == '-') {
    equation.answer = equation.num1 - equation.num2;
    console.log('successfully subtracted', equation.answer);
  } else if (equation.math == '+') {
    equation.answer = parseInt(equation.num1) + parseInt(equation.num2);
    console.log('successfully added', equation.answer);
  } else if (equation.math == '*') {
    equation.answer = equation.num1 * equation.num2;
    console.log('successfully multiplied', equation.answer);
  } else if (equation.math == '/') {
    equation.answer = equation.num1 / equation.num2;
    console.log('successfully divided', equation.answer);
  }

  //   equation.answer = eval(equation.answer);
  // ** Commented out since instructions say to not use eval() and replaced with a series of if/else

  equationHistory.push(equation);
  res.send(201);
});
