// Select the input field
const firstNumberInfo = document.getElementById('first_number_info');
const operatorInfo = document.getElementById('operator_info');
let inputs = document.getElementById('first_number');
let operator = "";
let firstNumber = "";

// Function to handle calculation based on operator and numbers
function calculate(operator, num1, num2) {
    let result = 0;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        default:
            result = 0;
    }
    return result;
}

// Function to handle button click and keyboard input
function handleInput(value) {
    let currentValue = inputs.value;

    // Check if the value is a number or decimal point
    if (!isNaN(value) || value === ".") {
        // Append the value to the input field
        inputs.value = currentValue + value;
    }
    else if (value === "C") {
        // Clear the input field
        inputs.value = "";

    }
    else if (value === 'AC') {
        // Clear the input field
        inputs.value = "";
        firstNumberInfo.textContent = ''
        operatorInfo.textContent = ''

    }
    else if (value === "DEL") {
        // Delete the last character from the input field
        inputs.value = currentValue.slice(0, -1);
    }
    else if (value === "=") {
        // Perform the calculation if an operator and a first number are present
        if (operator && firstNumber) {
            const secondNumber = currentValue;
            const result = calculate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
            inputs.value = result;
            operator = "";
            firstNumber = "";
        }
    }
    else {
        // Store the operator and first number for calculation
        operator = value;
        firstNumber = currentValue;
        inputs.value = "";
        firstNumberInfo.textContent = firstNumber;
        operatorInfo.textContent = operator;
    }
}

// Event listener for button clicks
let btns = document.querySelectorAll('.btn');
btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        let value = btn.value;
        handleInput(value);
    });
});

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    let value = "";

    // Check if the pressed key is a number, operator, or a special key
    if (!isNaN(key) || key === "." || key === "+" || key === "-" || key === "*" || key === "/") {
        value = key;
    }
    else if (key === "Escape") {
        value = "AC";
    }
    else if (key === "Backspace") {
        value = "DEL";
    }
    else if (key === "Enter" || key === "=") {
        value = "=";
    }

    // Perform the appropriate action based on the value
    if (isValidInput(value)) {
        event.preventDefault(); // Prevent default keyboard behavior
        handleInput(value);
    }
});

function isValidInput(value) {
    // Check if the value is a valid input (numbers, operators, or special keys)
    return !isNaN(value) || value === "." || value === "+" || value === "-" || value === "*" || value === "/" || value ==="=" || value==="AC" || value==="DEL";
}

