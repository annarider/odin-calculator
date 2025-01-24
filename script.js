const add = function() {
  calculator.result = calculator.firstNumber + calculator.secondNumber;
};

const subtract = function() {
  calculator.result = calculator.firstNumber - calculator.secondNumber;
};

const multiply = function(multiplicand, multiplier) {
	return multiplicand * multiplier;
};

const divide = function(dividend, divisor) {
  return dividend / divisor;
};

const allClear = function() {
  calculator.display.textContent = '0';
  calculator.userInput = '';
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  calculator.operator = null;
  calculator.result = null;
};

function truncateDisplay() {
  calculator.userInput = calculator.userInput.slice(0, 11);
}

function clearDisplay() {
  calculator.userInput = '';
  calculator.display.textContent = calculator.userInput;
}

function updateDisplayText(input) {
  // check if overflowing display
  if (calculator.userInput.length > 10) truncateDisplay();
  calculator.display.textContent = input.toString();
}

function updateState(event) {
  const char = event.textContent;
  if (char === '=') operate();
  if ("+-×÷".includes(char) && calculator.firstNumber !== null) calculator.operator = char;
  if (char === 'AC') allClear();
  if (char === 'C') allClear(); // Need to update for backspace. Clearing for now
  if (/^\d$/.test(char)) {
    calculator.userInput += char;
    (!calculator.firstNumber) ? calculator.updateFirstNumber() : calculator.updateSecondNumber();
  };
  return char;
}

function buildDisplay(button, char) {
  if (char === '.') button.disabled = true;
  // check for first digit in firstNumber
  if (/^\d$/.test(char) && calculator.firstNumber === null) clearDisplay();
  // check for first digit in secondNumber
  if (/^\d$/.test(char) && 
  calculator.firstNumber && 
  calculator.operator &&
  calculator.secondNumber === null) clearDisplay();
  if (char !== '=' && char !== 'AC') updateDisplayText(calculator.userInput);
  if (char === 'AC') updateDisplayText('0');
  // reset to prepare for secondNumber  
  if ("+-×÷".includes(char) && calculator.firstNumber !== null) calculator.userInput = '';
}

function Calculator() {
  this.display = document.querySelector("#display")
  this.userInput = '';
  this.buttons = document.querySelectorAll("button");
  this.firstNumber = null;
  this.secondNumber = null;
  this.operator = null;
  this.result = null;
  this.updateFirstNumber = function () {
    this.firstNumber = Number(this.userInput);
  };
  this.updateSecondNumber = function () {
    this.secondNumber = Number(this.userInput);
  };
  this.updateResultNumber = function () {
    this.result = Number(this.userInput);
  };
  
}

const calculator = new Calculator();

calculator.buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const char = updateState(button, e);
    buildDisplay(button, char);
  });
});

function operate() {
  if (calculator.firstNumber !== null && calculator.secondNumber !== null && 
    typeof calculator.firstNumber === 'number' && typeof calculator.secondNumber === 'number') {
    if (calculator.operator === '+') add();
    if (calculator.operator === '-') subtract();
    if (calculator.operator === '*') multiply();
    if (calculator.operator === '/') divide();
    updateDisplayText(calculator.result);
  }
}