const add = function(augend, addend) {
  return augend + addend;
};

const subtract = function(minuend, subtrahend) {
  return minuend - subtrahend;
};

const multiply = function(multiplicand, multiplier) {
	return multiplicand * multiplier;
};

const divide = function(dividend, divisor) {
  return dividend / divisor;
};

let firstNumber = 0;
let secondNumber = 0; 
let operator = '';

function operate(firstNumber, secondNumber, operator) {
  if (operator === '+') return add(firstNumber, secondNumber);
  if (operator === '-') return subtract(firstNumber, secondNumber);
  if (operator === '*') return multiply(firstNumber, secondNumber);
  if (operator === '/') return divide(firstNumber, secondNumber);
}