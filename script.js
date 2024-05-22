const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let tries = 0;
let matches = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.flower === secondCard.dataset.flower;
    isMatch ? disableCards() : unflipCards();
    document.getElementById('tries').textContent = ++tries;
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matches++;
    if (matches === 3) {
        setTimeout(showPopup, 500); // Delay the win popup by 500ms
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 6);
        card.style.order = randomPos;
    });
}

function resetGame() {
    tries = 0;
    matches = 0;
    document.getElementById('tries').textContent = tries;
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.addEventListener('click', flipCard);
    });
    shuffle();
}

function showPopup() {
    document.getElementById('popup').classList.add('visible');
}

function closePopup() {
    document.getElementById('popup').classList.remove('visible');
    resetGame();
}

shuffle();
cards.forEach(card => card.addEventListener('click', flipCard));