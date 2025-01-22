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

const allClear = function() {
return display = 0;
};


const buttons = document.querySelectorAll("button");
let firstNumber = 0;
let secondNumber = 0; 
let operator = '';

const display = document.querySelector("#display");
let displayText = '0';

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // clear display on first button press
    if (displayText.length === 1 && displayText === '0') displayText = '';
    if (displayText.length <= 10) {
      const char = e.target.textContent;
      displayText += char;
      display.textContent = displayText; 
    }
  // const clearButton = document.createElement("clear");
  
  });
});

function operate(firstNumber, secondNumber, operator) {
  if (operator === '+') return add(firstNumber, secondNumber);
  if (operator === '-') return subtract(firstNumber, secondNumber);
  if (operator === '*') return multiply(firstNumber, secondNumber);
  if (operator === '/') return divide(firstNumber, secondNumber);
}