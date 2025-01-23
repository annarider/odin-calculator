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

function truncateDisplay() {
  calculator.displayText = calculator.displayText.slice(0, 11);
}

function clearDisplay() {
  calculator.displayText = '';
}

function concatenateDisplay(char) {
  // check if overflowing display
  if (calculator.displayText.length <= 10) {    
    calculator.displayText += char;
  } else {
    truncateDisplay(calculator)
  }
  calculator.display.textContent = calculator.displayText; 
}

function updateState(char) {
  if (char.match(/[0-9|.]/)) concatenateDisplay(char);
  if (char === '=') operate();
  if (char.match(/[+|-|×|÷]/) && calculator.firstNumber) calculator.operator = char;
  if (calculator.firstNumber && calculator.operator) {
    clearDisplay();
    calculator.secondNumber = Number(calculator.displayText);
  }
  calculator.firstNumber = Number(calculator.displayText);
}


function buildDisplay(button, event) {
  // clear display on first button press
  if (calculator.displayText.length === 1 && calculator.displayText === '0') clearDisplay();
  // build display
  const char = event.target.textContent;
  if (char === '.') button.disabled = true;
  // only show numbers and decimal point in display
  updateState(char);
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
    buildDisplay(button, e);
  });
});

function operate() {
  if (calculator.operator === '+') add(calculator.firstNumber, calculator.secondNumber);
  if (calculator.operator === '-') subtract(calculator.firstNumber, calculator.secondNumber);
  if (calculator.operator === '*') multiply(calculator.firstNumber, calculator.secondNumber);
  if (calculator.operator === '/') divide(calculator.firstNumber, calculator.secondNumber);
}

