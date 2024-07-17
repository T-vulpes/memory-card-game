const cards = document.querySelectorAll('.memory-card');
const gameStatus = document.getElementById('game-status');
const remainingAttemptsElement = document.getElementById('remaining-attempts');
const scoreElement = document.getElementById('score');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let errorCount = 0;
const maxErrors = 5;
let score = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score += 5;
    scoreElement.textContent = score;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
        errorCount++;
        remainingAttemptsElement.textContent = maxErrors - errorCount;
        if (errorCount >= maxErrors) {
            gameOver();
        }
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function gameOver() {
    cards.forEach(card => card.classList.add('flip'));
    gameStatus.innerHTML = `<p>Remaining Attempts: 0</p><p>Score: ${score}</p><p>You Lost!</p>`;
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
