"use strict";

const dspMsg = document.querySelector("#dsp-msg");
const checkGuess = document.querySelector("#check-guess");
let userInput = document.querySelector("#user-input");
const attemptsElement = document.querySelector("#attempt-left");
const newGame = document.querySelector("#new-game");



const minNumber = 1;
const maxNumber = 50;
let targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
let attempts = 0;
let maxAttempts = 5;

let gameInProgress = false; // keep track of game play
newGame.disabled = true; // disable new game button initially

// console.log(targetNumber);

// using array for quirky/sarcastic messages
const quirkyMessages = [
  "Looks like guessing isn't your strong suit!",
  "Guessing games are hard, aren't they?",
  "The number was right there! Better luck next time.",
  "Are you trying to confuse the computer?",
  "Guessing is tough work, huh?"
];

// array for congratulatory messages
const congratulatoryMessages = [
  "Congratulations! You're a guessmaster!",
  "Wow! You guessed it right!",
  "Impressive! You got it!",
  "You nailed it! Well done!",
  "Bravo! You're a guessing pro!"
];

// function to select a random message from an array
function getRandomMessage(messagesArray) {
  const randomArrayIndex = Math.floor(Math.random() * messagesArray.length);
  return messagesArray[randomArrayIndex];
}




checkGuess.addEventListener('click', (e) => {
    e.preventDefault();
    userInput = parseInt(document.querySelector("#user-input").value);

    if (isNaN(userInput) || userInput < minNumber || userInput > maxNumber) {
        dspMsg.textContent = `Please enter a number between ${minNumber} and ${maxNumber}.`;
        return;
    }

    attempts++;
    let attemptsLeft = maxAttempts - attempts;

    if (userInput === targetNumber) {
        dspMsg.textContent = `${getRandomMessage(congratulatoryMessages)} You guessed the correct number "${targetNumber}" in ${attempts} attempt(s).`;
        document.querySelector("#check-guess").disabled = true;
        disableGame(); // call function to disable game
    } else if (userInput < targetNumber) {
        dspMsg.textContent = "Too low! Try again.";
    } else {
        dspMsg.textContent = "Too high! Try again.";
    }

    attemptsElement.textContent = `Attempts left: ${attemptsLeft}`;

    if (attempts === maxAttempts) {
        dspMsg.textContent = `${getRandomMessage(quirkyMessages)} The correct number was ${targetNumber}.`;
        document.querySelector("#check-guess").disabled = true;
        disableGame(); // call function to disable game
    }
  document.querySelector("#user-input").value = "";
});





newGame.addEventListener('click', (e) => {
    console.log("New game button clicked");
    e.preventDefault();
    resetGame();
});

function resetGame() {
    attempts = 0;
    targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    gameInProgress = false; // Reset game state
    newGame.disabled = false; // Enable New Game button
    document.querySelector("#check-guess").disabled = false;
    document.querySelector("#user-input").value = "";
    dspMsg.textContent = `New game started! Guess a number between ${minNumber} and ${maxNumber}.`;
    attemptsElement.textContent = `Attempts left: ${maxAttempts}`;
}


function disableGame() {
    gameInProgress = false; // Reset game state
    newGame.disabled = false; // Enable New Game button
}



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
