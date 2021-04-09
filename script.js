//Get h1 object
const rainbowText = document.querySelector('#rainbow-text');

//Get input field objects
const input = document.querySelector('input[type="text"]');

//Get button object 
const button = document.querySelector('button[type="button"]');

//Get container
const container = document.querySelector('.rainbow-text-container');


//Add event listener on button click
button.addEventListener('click', () => {
    const inputValue = input.value
    //Remove the error span if it exists
    checkSpanError();

    //If input value is within allowed length, run. Else output error
    if (inputValue.length <= 12) {
        transformText();
    } else {
        inputError();
    }
});

//Add event listener when a key is released
//Need to submit on ONLY ENTER KEYUP. if keyup is enter, call transformText else do nothing.
//Will this cause resource issues?
//https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

input.addEventListener('keyup', (keyPress) => {
    const inputValue = input.value;
    if (keyPress.key === 'Enter') {
        checkSpanError();
        if (inputValue.length > 12) {
            inputError();
        } else {
            transformText();
        }
    }

});


function checkSpanError() {
    //Check if error span exists
    if (document.querySelector('#spanError')) {
        //If it does remove it
        document.querySelector('#spanError').remove();
    }
}

function inputError() {
    //Create and initialize a span
    const span = document.createElement('span');
    span.style.cssText = 'color:white; padding:2px; border: 2px white solid; margin-top: 10px;';
    span.innerText = 'Too many characters! MAX 12';
    span.id = 'spanError';

    //Insert the span before the text input
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    input.insertAdjacentElement('beforebegin', span);

}


function transformText() {
    //On click, clear text contents of rainbowText
    //rainbowText.textContent = '';

    //Get the input value
    const inputValue = input.value;

    //Set the interval
    const interval = Math.floor(255 / inputValue.length);

    //Convert a string to an array with each index as a char (If separator is an empty string (""), str is converted to an array of each of its UTF-16 "characters".)
    const textArray = inputValue.split('');

    //Loop to create multiple span elements depending on input value length
    for (let i = 0; i < inputValue.length; i++) {

        //Create a span element
        const span = document.createElement('span');

        //Set the textContent for the current span
        span.textContent = textArray[i];

        //Set the styles for the current span
        span.style.cssText = `color: hsla(${i * interval}, 100%, 50%); font-size: ${25 + i * 2}px;`;
        
        //Append each child to the parent (When each span is completed, append it to the parent)
        container.append(span);
    }
}