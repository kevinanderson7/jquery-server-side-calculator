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
  equation.answer = equation.num1 + equation.math + equation.num2;
  equation.answer = eval(equation.answer);

  equationHistory.push(equation);
  res.send(201);
});
