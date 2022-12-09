/* Creating Constants for our elements */
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button'); /* it will return an array of all of our buttons */
const clearButton = document.getElementById('clear-btn');

/* saving the numbers and operators */
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

/* creating a function that passes a parameter to our event listener */
function sendNumber(number) {
    //we need to create a condition that will reset the display if we are awaiting the next value or else we will update the display to accept more than one single digit numbers 
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        //calculatorDisplay.textContent=number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;// first we are setting the textcontent to be equal to the display value and checking through iternary operator if the display value is qual to zero we set it equal to the number passed else we will add  it 
    }
}

/* Making sure only one decimal is added */
function addDecimal() {
    // if operator is clicked dont add a decimal value to the first value
    if (awaitingNextValue) return;
    // we will check the h1 and if it has no decimal we can add one if it contains then we cannot add
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}


// calculate first and second value depending on value
const calculate = {
    '/': (firstNumer, secondNumber) => firstNumer / secondNumber,
    '*': (firstNumer, secondNumber) => firstNumer * secondNumber,
    '+': (firstNumer, secondNumber) => firstNumer + secondNumber,
    '-': (firstNumer, secondNumber) => firstNumer - secondNumber,
    '=': (firstNumer, secondNumber) => secondNumber,
};


//creating operator function
function useOperator(operator) {
    // Converting string from h1 into number to be used in calcs
    const currentValue = Number(calculatorDisplay.textContent);
    //to prevent mutliple operators
    if (operator && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    //checking if first value already exists or not
    if (!firstValue) {
        firstValue = currentValue;
    } else { // if we have a first value , we want to add functionality to store the next value
        // console.log(firstValue, operatorValue, currentValue)
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        // console.log("calculation", calculation);
        firstValue = calculation;

    }
    // ready for the next value, store our operator
    awaitingNextValue = true;
    operatorValue = operator
    // console.log('firstValue', firstValue);
    // console.log('operator', operator);

}



// adding the Clear Button Functionality , plus resetting the first value and operator
function resetCalc() {
    calculatorDisplay.textContent = '0'
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}
clearButton.addEventListener("click", () => resetCalc())


// adding event listeners for number, operators and decimal button
// we have an array and we are going to use a for each to loop through that array

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumber(inputBtn.value));
    } else if (inputBtn.classList.contains('operators')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    }
})

