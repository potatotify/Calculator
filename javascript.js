// Select elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '0'; // Store the current number as a string
let firstOperand = null; // Store the first operand
let secondOperand = null; // Store the second operand
let operator = ''; // Store the selected operator
let isResult = false; // Flag to check if a result has been computed

// Update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Handle number button click
function handleNumber(number) {
    if (isResult) {
        currentInput = number;
        isResult = false;
    } else {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }
    updateDisplay(currentInput);
}

function handleOperator(op) {

    if (firstOperand !== null) {

        secondOperand = parseFloat(currentInput);
        firstOperand = performCalculation(firstOperand, secondOperand, operator);
        currentInput = firstOperand.toString();
        updateDisplay(currentInput);
    } else {
        firstOperand = parseFloat(currentInput);
    }
    operator = op;
    currentInput = '0'; 
}


function performCalculation(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            if (second === 0) {
                alert('Cannot divide by zero');
                return first;
            }
            return first / second;
        case '%':
            return first % second;
        default:
            return second; 
    }
}

function handleEquals() {
    if (operator && firstOperand !== null) {
        secondOperand = parseFloat(currentInput);
        firstOperand = performCalculation(firstOperand, secondOperand, operator);
        currentInput = firstOperand.toString();
        updateDisplay(currentInput);
        operator = ''; 
        firstOperand = null; 
        isResult = true; 
    }
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

function handleClear() {
    currentInput = '0';
    firstOperand = null;
    secondOperand = null;
    operator = '';
    updateDisplay(currentInput);
}

function handleDelete() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay(currentInput);
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('num')) {
            handleNumber(button.textContent);
        } else if (button.classList.contains('operator')) {
            handleOperator(button.textContent);
        } else if (button.id === 'equals') {
            handleEquals();
        } else if (button.id === 'dot') {
            handleDecimal();
        } else if (button.id === 'AC') {
            handleClear();
        } else if (button.id === 'Del') {
            handleDelete();
        }
    });
});
