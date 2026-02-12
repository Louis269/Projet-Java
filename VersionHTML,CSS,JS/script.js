let secretNumber;
let attempts;
let maxAttempts;
let maxRange;

const difficultySelect = document.getElementById("difficulty");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");
const rangeInfo = document.getElementById("range-info");

function startGame() {
    attempts = 0;

    const difficulty = difficultySelect.value;

    if (difficulty === "easy") {
        maxRange = 50;
        maxAttempts = 15;
    } else if (difficulty === "medium") {
        maxRange = 100;
        maxAttempts = 10;
    } else {
        maxRange = 200;
        maxAttempts = 7;
    }

    secretNumber = Math.floor(Math.random() * maxRange) + 1;

    rangeInfo.textContent = `Devine un nombre entre 1 et ${maxRange}`;
    message.textContent = "";
    attemptsText.textContent = `Essais : 0 / ${maxAttempts}`;
    guessInput.disabled = false;
    guessBtn.disabled = false;
    restartBtn.classList.add("hidden");
}

guessBtn.addEventListener("click", () => {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > maxRange) {
        message.textContent = `Entre un nombre valide entre 1 et ${maxRange}`;
        return;
    }

    attempts++;

    if (guess < secretNumber) {
        message.textContent = "C'est plus grand !";
    } else if (guess > secretNumber) {
        message.textContent = "C'est plus petit !";
    } else {
        message.textContent = `🎉 Bravo ! Trouvé en ${attempts} essais !`;
        endGame();
        return;
    }

    if (attempts >= maxAttempts) {
        message.textContent = `💀 Game Over ! Le nombre était ${secretNumber}`;
        endGame();
    }

    attemptsText.textContent = `Essais : ${attempts} / ${maxAttempts}`;
});

function endGame() {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", startGame);

startGame();
