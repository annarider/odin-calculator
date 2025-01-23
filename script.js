const add = function() {
  if (Number(calculator.firstNumber) && Number(calculator.secondNumber)) {
    calculator.result = calculator.firstNumber + calculator.secondNumber;
    updateDisplayText(calculator.result);
  }
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
  calculator.displayText = '0';
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  calculator.operator = null;
  calculator.result = null;

};

function truncateDisplay() {
  calculator.displayText = calculator.displayText.slice(0, 11);
}

function clearDisplay() {
  calculator.displayText = '';
  calculator.display.textContent = calculator.displayText;
}

function updateDisplayText(result) {
  // check if overflowing display
  if (calculator.displayText.length <= 10) {    
    calculator.displayText = result.toString();
  } else {
    truncateDisplay();
  }
  calculator.display.textContent = calculator.displayText;
}

function concatenateDisplay(char) {
  calculator.displayText += char;
  updateDisplayText(calculator.displayText);
}

function updateState(char) {
  if (char === '=') operate();
  if (char.match(/[+|-|×|÷]/) && calculator.firstNumber) calculator.operator = char;
  if (char === 'AC') allClear();
  if (char === 'C') allClear(); // Need to update for backspace. Clearing for now
  // testing for secondNumber
  if (char.match(/[0-9|.]/)) {
    if (calculator.firstNumber && calculator.operator)  clearDisplay();
    concatenateDisplay(char);
    (!calculator.firstNumber) ? calculator.updateFirstNumber() : calculator.updateSecondNumber();
  };
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
  this.result = null;
  this.updateFirstNumber = function () {
    this.firstNumber = Number(this.displayText);
  };
  this.updateSecondNumber = function () {
    this.secondNumber = Number(this.displayText);
  };
  this.updateResultNumber = function () {
    this.result = Number(this.displayText);
  };
}

const calculator = new Calculator();

calculator.buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buildDisplay(button, e);
  });
});

function operate() {
  if (calculator.operator === '+') add();
  if (calculator.operator === '-') subtract();
  if (calculator.operator === '*') multiply();
  if (calculator.operator === '/') divide();
}

