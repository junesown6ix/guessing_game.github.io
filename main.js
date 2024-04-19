"use strict";

const dspMsg = document.querySelector("#dsp-msg");
const checkGuess = document.querySelector("#check-guess");
let userInput = document.querySelector("#user-input");
const attemptsElement = document.querySelector("#attempt-left");
const newGame = document.querySelector("#new-game");
const hintBtn = document.querySelector("#get-hint");
const hintDisplay = document.getElementById('hint-disp');
// const difficultLevelDropdown = document.querySelector("#difficulty-level");



const minNumber = 1;
const maxNumber = 50;
let targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
let attempts = 0;
let maxAttempts = 5;

let gameInProgress = false; // keep track of game play
newGame.disabled = true; // disable new game button initially
let gameWon = false; // Flag to track game won
let gameLost = false; // Flag to track game lost
let currentHint = "";

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


//event listener to the hint button

hintBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentHint === "") {
        //generate a random hint based on the target number 
    const targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    currentHint = generateHint(targetNumber);
    }
    

    hintDisplay.textContent = currentHint;

    // alert(currentHint);


});

function generateHint(targetNumber) {
    if (targetNumber % 2 === 0) {
        return "The target number is even.";
    } else {
        return "The target number is odd."
    }
}

checkGuess.addEventListener('click', (e) => {
    e.preventDefault();
    if (!gameInProgress) {
        gameInProgress = true; // Set game in progress
        newGame.disabled = true; // Disable New Game button
    }
    userInput = parseInt(document.querySelector("#user-input").value);

    if (isNaN(userInput) || userInput < minNumber || userInput > maxNumber) {
        dspMsg.textContent = `Please enter a number between ${minNumber} and ${maxNumber}.`;
        return;
    }

    attempts++;
    let attemptsLeft = maxAttempts - attempts;

    if (userInput === targetNumber) {
        gameWon = true;
        dspMsg.textContent = `${getRandomMessage(congratulatoryMessages)} You guessed the correct number "${targetNumber}" in ${attempts} attempt(s).`;
        document.querySelector("#check-guess").disabled = true;
        disableGame(); // call function to disable game
    } else if (attempts === maxAttempts) { // Check if user has exhausted all attempts
        gameLost = true;
        dspMsg.textContent = `${getRandomMessage(quirkyMessages)} The correct number was ${targetNumber}.`;
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

  // Check if the game is over and the last attempt was successful
    if ((gameWon || gameLost) && attempts === maxAttempts && userInput === targetNumber) {
        // Update message to congratulate the user instead of displaying a quirky message
        dspMsg.textContent = `${getRandomMessage(congratulatoryMessages)} You guessed the correct number "${targetNumber}" in ${attempts} attempt(s).`;
    }
  document.querySelector("#user-input").value = "";
});


// difficultLevelDropdown.addEventListener('change', (e) => {
//     e.preventDefault();
//     console.log("i was selected");
    
//     const selectedDifficulty = difficultLevelDropdown.value;

//     //update game params based on selected difficulty

//     updateGameParams(selectedDifficulty);
// });


//function to update game params based on the selected difficulty 
/*function updateGameParams(difficulty) {
    //adjusting the range of numbers and max attempts based on level
    let minNumber, maxNumber, maxAttempts;

    switch (difficulty) {
        case 'easy': 
            minNumber = 1;
            maxNumber = 50;
            maxAttempts = 5;
            break;
        case 'medium':
            minNumber = 1;
            maxNumber = 100;
            maxAttempts = 3;
            break;
        case 'hard':
            minNumber = 1;
            maxNumber = 500;
            maxAttempts = 2;
            break;
            default:
                // default to medium difficulty
            minNumber = 1;
            maxNumber = 100;
            maxAttempts = 3;
            break;
    }

    document.getElementById('difficulty-level-disp').textContent = difficulty.toUpperCase();

    document.get
}
*/



newGame.addEventListener('click', (e) => {
    console.log("New game button clicked");
    e.preventDefault();
    resetGame();
});

function resetGame() {
    attempts = 0;
    targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    gameInProgress = false; // Reset game state
    newGame.disabled = true; // Enable New Game button
    document.querySelector("#check-guess").disabled = false;
    document.querySelector("#user-input").value = "";
    dspMsg.textContent = `New game started! Guess a number between ${minNumber} and ${maxNumber}.`;
    hintDisplay.textContent = '';
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
