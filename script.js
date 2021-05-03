'use strict';

// Variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Functions
const reset = () => {
  const player = document.querySelector(`.player--${activePlayer}`);
  player.classList.remove('player--winner');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const rolling = () => {
  if (playing) {
    // Seleceting
    const currentPlayer = document.getElementById(`current--${activePlayer}`);

    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./picture/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      currentPlayer.textContent = currentScore;
    } else {
      // Switch to next player
      switching(currentPlayer);
    }
  }
};

const holding = () => {
  if (playing) {
    //Selecting
    let i = activePlayer;
    const currentPlayer = document.getElementById(`current--${activePlayer}`);
    const playerScore = document.getElementById(`score--${activePlayer}`);
    const player = document.querySelector(`.player--${activePlayer}`);

    // Add score
    scores[i] += currentScore;
    playerScore.textContent = scores[i];
    currentPlayer.textContent = currentScore = 0;

    // If score > 100 => finish
    if (scores[i] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      player.classList.add('player--winner');
      player.classList.remove('player--active');
    } else {
      // Switch to next player
      switching(currentPlayer);
    }
  }
};

const switching = currentPlayer => {
  currentScore = 0;
  currentPlayer.textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Buttons Add Event
btnRoll.addEventListener('click', rolling);
btnNew.addEventListener('click', reset);
btnHold.addEventListener('click', holding);

// Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnInfo = document.querySelector('.info');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const escCloseModal = e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
};

btnInfo.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', escCloseModal);
