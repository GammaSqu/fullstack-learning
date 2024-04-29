let inputEquation = document.querySelector('.input-equation');
let input = document.querySelector('.calculator-input');
let buttons = document.querySelectorAll('.calculator-btn');
let calculateResult = function () {
  let inputValue = input.value;
  let result = '';

  try {
    result = eval(inputValue);
  } catch (e) {
    result = 'ERROR';
  }

  if (result === 'ERROR') {
    inputEquation.innerHTML = '';
  } else {
    inputEquation.innerHTML = inputValue;
  }

  input.value = result;
};
let clearInput = function () {
  input.value = '';
};
let deleteLastInput = function () {
  input.value = input.value.slice(0, -1);
};

let onCalculatorButtonClick = function (event) {
  let action = event.currentTarget.textContent;

  processCalculatorAction(action);
};
for (let i = 0; i < buttons.length; i++) {
  let currentButton = buttons[i];

  currentButton.addEventListener('click', onCalculatorButtonClick);
}

let processCalculatorAction = function (action) {
  if (action === '=') {
    calculateResult();
  } else if (action === 'AC') {
    clearInput();
  } else if (action === 'DEL') {
    deleteLastInput();
  } else {
    let inputValue = input.value;
    let newValue = inputValue + action;

    input.value = newValue;
  }
};

let isLastCharacterAnOperator = function (inputValue) {
  let lastCharacter = inputValue.slice(-1);
  let operators = ['+', '-', '/', '*', '.'];

  let result = operators.includes(lastCharacter);
  return result;
};

let linkKeys = function (event) {
  let key = event.key;
  let action;
  if (key === 'Enter') {
    action = '=';
  } else if (key === 'Escape') {
    action = 'AC';
  } else if (key === 'Backspace') {
    action = 'DEL';
  } else {
    action = key;
  }

  let keyArray = [];
  for (let i = 0; i < buttons.length; i++) {
    let currentButton = buttons[i];
    let buttonText = currentButton.textContent;
    keyArray.push(buttonText);
  }
  let isOperator = isLastCharacterAnOperator(input.value);
  console.log(isOperator);

  if (keyArray.includes(action)) {
    processCalculatorAction(action);
  }
};

document.body.addEventListener('keyup', linkKeys);
