/* Creating Constants for our elements */
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button'); /* it will return an array of all of our buttons */
const clearBtn = document.getElementById('equal-sign-btn');

/* creating a function that passes a parameter to our event listener */
function sendNumber(number) {
    //console.log(number);
    //calculatorDisplay.textContent=number
    //if current display = 0 we are going to replace if not we are going to add it
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;// first we are setting the textcontent to be equal to the display value and checking through iternary operator if the display value is qual to zero we set it equal to the number passed else we will add  it 
}
    //console.log(inputBtns);
    // adding event listeners for number, operators and decimal button
    // we have an array and we are going to use a for each to loop through that array

    inputBtns.forEach((inputBtn) => {
        if (inputBtn.classList.length === 0) {
            inputBtn.addEventListener('click', () => sendNumber(inputBtn.value));
        } else if (inputBtn.classList.contains('operators')) {
            inputBtn.addEventListener('click', () => sendNumber(inputBtn.value))
        } else if (inputBtn.classList.contains('decimal')) {
            inputBtn.addEventListener('click', () => sendNumber(inputBtn.value))
        }
    })