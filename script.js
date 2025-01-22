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

function truncateDisplay(calculator) {
  calculator.displayText = calculator.displayText.slice(0, 11);
}

function concatenateDisplay(char, calculator) {
  if (char.match(/[0-9|.]/)) {
    calculator.displayText += char;
    calculator.display.textContent = calculator.displayText; 
  }
}
  
function Calculator() {
  this.display = document.querySelector("#display")
  this.displayText = '0';
  this.buttons = document.querySelectorAll("button");
  this.firstNumber = null;
  this.secondNumber = null;
  this.operator = null;
}
  
const calculator = new Calculator();

calculator.buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // clear display on first button press
    if (calculator.displayText.length === 1 && calculator.displayText === '0') calculator.displayText = '';
    // check if overflowing display
    if (calculator.displayText.length <= 10) {
      // build display
      const char = e.target.textContent;
      if (char === '.') button.disabled = true;
      // only show numbers and decimal point in display
      concatenateDisplay(char, calculator);
    } else {
      truncateDisplay(calculator); 
      ;
    }
  
  });
});

function operate(firstNumber, secondNumber, operator) {
  if (operator === '+') return add(firstNumber, secondNumber);
  if (operator === '-') return subtract(firstNumber, secondNumber);
  if (operator === '*') return multiply(firstNumber, secondNumber);
  if (operator === '/') return divide(firstNumber, secondNumber);
}

