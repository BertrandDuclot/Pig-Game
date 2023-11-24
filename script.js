"use strict";

// Selection of the elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Switch player function
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

let scores, currentScore, activePlayer, playing;


// Initialisation function
function Initialisation(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add("hidden");
}
Initialisation();

// Rolling the dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generate random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // Show the dice number
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // Check if dice rolled 1F
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding to save score
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add("hidden");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    }
    switchPlayer();
  }
});

// Resetting the game
btnNew.addEventListener('click', Initialisation);



