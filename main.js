"use strict";

// while (attempts < maxAttempts) {
//     guess = parseInt(prompt(`Guess a number between ${minNumber} and ${maxNumber} (${maxAttempts - attempts} attempts left): `));

//     if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
//         console.log("Please enter a valid number within the specified range.");
//         continue;
//     }

//     attempts++;

//     if (guess === targetNumber) {
//         console.log(`Congratulations! You guessed the correct number ${targetNumber} in ${attempts} attempt(s).`);
//         break;
//     } else if (guess < targetNumber) {
//         console.log("Too low! Try again.");
//     } else {
//         console.log("Too high! Try again.");
//     }
// }




const dspMsg = document.querySelector("#dsp-msg");
const checkGuess = document.querySelector("#check-guess");
let userInput = document.querySelector("#user-input");
const attemptsElement = document.querySelector("#attempt-left");
const newGame = document.querySelector("#new-game");



const minNumber = 1;
const maxNumber = 50;
let targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
let attempts = 0;
let maxAttempts = 10;


// console.log(targetNumber);



checkGuess.addEventListener('click', (e) => {
    e.preventDefault();
    userInput = parseInt(document.querySelector("#user-input").value);

    if (isNaN(userInput) || userInput < minNumber || userInput > maxNumber) {
        dspMsg.textContent = "Please enter a valid number within the specified range.";
        return;
    }

    attempts++;
    let attemptsLeft = maxAttempts - attempts;

    if (userInput === targetNumber) {
        dspMsg.textContent = `Congratulations! You guessed the correct number "${targetNumber}" in ${attempts} attempt(s).`;
        document.querySelector("#check-guess").disabled = true;
    } else if (userInput < targetNumber) {
        dspMsg.textContent = "Too low! Try again.";
    } else {
        dspMsg.textContent = "Too high! Try again.";
    }

    attemptsElement.textContent = `Attempts left: ${attemptsLeft}`;

    if (attempts === maxAttempts) {
        dspMsg.textContent = `Sorry, you've run out of attempts. The correct number was ${targetNumber}.`;
        document.querySelector("#check-guess").disabled = true;
    }
});




newGame.addEventListener('click', (e) => {
    console.log("New game button clicked");
    e.preventDefault();
    attempts = 0;
    targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    // console.log(`New target number: ${targetNumber}`)
    document.querySelector("#check-guess").disabled = false;


    document.querySelector("#user-input").value = "";
    dspMsg.textContent = `New game started! Guess a number between ${minNumber} and ${maxNumber}.`;
    attemptsElement.textContent = `Attempts left: ${maxAttempts}`;
});







 
 