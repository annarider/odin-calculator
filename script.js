const add = function() {
  calculator.result = calculator.firstNumber + calculator.secondNumber;
};

const subtract = function() {
  calculator.result = calculator.firstNumber - calculator.secondNumber;
};

const multiply = function() {
  calculator.result = calculator.firstNumber * calculator.secondNumber;
};

const divide = function() {
  calculator.result = calculator.firstNumber / calculator.secondNumber;
};

function operate() {
  if (calculator.firstNumber !== null && calculator.secondNumber !== null && 
    typeof calculator.firstNumber === 'number' && typeof calculator.secondNumber === 'number') {
    if (calculator.operator === '+') add();
    if (calculator.operator === '-') subtract();
    if (calculator.operator === '×') multiply();
    if (calculator.operator === '÷') divide();
    updateDisplayText(calculator.result);
  }
}

function handleSubsequentNumbers(char) {
  calculator.firstNumber = calculator.result;
  calculator.secondNumber = null;
}

function allClear() {
  calculator.display.textContent = '0';
  const decimalButton = Array.from(calculator.buttons).find(button => button.id === 'decimal-point');
  decimalButton.disabled = false;
  calculator.userInput = '';
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  calculator.operator = null;
  calculator.result = null;
};

function truncateDisplay(input) {
  return input.slice(0, 11);
}

function clearDisplay() {
  calculator.userInput = '';
  calculator.display.textContent = calculator.userInput;
}

function updateDisplayText(input) {
  if (input !== null) input = input.toString();
  // check if overflowing display
  if (input.length > 10) input = truncateDisplay(input);
  calculator.display.textContent = input;
}

function hasDecimal(currentValue){
  return currentValue.toString().includes('.');
}

function updateState(event) {
  const char = event.textContent;
  if (char === '=' || ("+-×÷".includes(char)  && calculator.result !== null)) operate();
  if ("+-×÷".includes(char) && calculator.firstNumber !== null) calculator.operator = char;
  if (char === 'AC') allClear();
  if (char === 'C') allClear(); // Need to update for backspace. Clearing for now
  if (/^\d$/.test(char)) {
    calculator.userInput += char;
    (!calculator.operator) ? calculator.updateFirstNumber() : calculator.updateSecondNumber();
  };
  if (char === '.' && !hasDecimal(calculator.userInput)) calculator.userInput += char; 
  // prepare for subsequent numbers after secondNumber
  if ("+-×÷".includes(char) && calculator.result !== null) handleSubsequentNumbers(char);
  return char;
}

function buildDisplay(button, char) {
  if (char === '.') button.disabled = hasDecimal(calculator.userInput);
  // check for first digit in firstNumber
  if (/^\d$/.test(char) && calculator.firstNumber === null) clearDisplay();
  // check for first digit in secondNumber
  if (/^\d$/.test(char) && 
  calculator.firstNumber && 
  calculator.operator &&
  calculator.secondNumber === null) clearDisplay();
  if (char !== '=' && char !== 'AC' & !"+-×÷".includes(char)) updateDisplayText(calculator.userInput);
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