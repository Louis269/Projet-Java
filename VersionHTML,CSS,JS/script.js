let secretNumber;
let attempts;
let maxAttempts;
let maxRange;
let gamePaused = false;

const difficultySelect = document.getElementById("difficulty");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");
const rangeInfo = document.getElementById("range-info");
const quitGameBtn = document.getElementById("quitGameBtn");


const pauseBtn = document.getElementById("pauseBtn");
const pauseOptions = document.getElementById("pauseOptions");
const resumeBtn = document.getElementById("resumeBtn");
const quitBtn = document.getElementById("quitBtn");

function startGame() {
    attempts = 0;
    gamePaused = false;

    // Choix de la difficulté
    const diff = difficultySelect.value;
    switch (diff) {
        case "1": maxRange = 50; maxAttempts = 15; break;
        case "2": maxRange = 100; maxAttempts = 10; break;
        case "3": maxRange = 200; maxAttempts = 7; break;
        default: maxRange = 100; maxAttempts = 10;
    }

    secretNumber = Math.floor(Math.random() * maxRange) + 1;

    rangeInfo.textContent = `Devine un nombre entre 1 et ${maxRange}`;
    message.textContent = "";
    attemptsText.textContent = `Essais : 0 / ${maxAttempts}`;
    guessInput.disabled = false;
    guessBtn.disabled = false;
    pauseBtn.disabled = false;

    pauseBtn.classList.remove("hidden");
    pauseOptions.classList.add("hidden");
    restartBtn.classList.add("hidden");
}

function endGame() {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    pauseBtn.disabled = true;
    restartBtn.classList.remove("hidden");
    quitGameBtn.classList.remove("hidden");
}

// Quand le joueur clique sur quitter à la fin
quitGameBtn.addEventListener("click", () => {
    // Fermer la fenêtre si possible
    window.close();

    // Si ça ne fonctionne pas (navigation normale), on peut rediriger vers une page vide
    window.location.href = "about:blank";
});

// 🎮 Gestion Pause
pauseBtn.addEventListener("click", () => {
    gamePaused = true;
    message.textContent = "=== Jeu en pause ===";
    guessInput.disabled = true;
    guessBtn.disabled = true;

    pauseBtn.classList.add("hidden");
    pauseOptions.classList.remove("hidden");
});

// Reprendre
resumeBtn.addEventListener("click", () => {
    gamePaused = false;
    message.textContent = "Reprise du jeu !";
    guessInput.disabled = false;
    guessBtn.disabled = false;

    pauseOptions.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
});

// Quitter
quitBtn.addEventListener("click", () => {
    gamePaused = false;
    message.textContent = "Tu as quitté la partie !";
    endGame();

    pauseOptions.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
});

// Validation du nombre
guessBtn.addEventListener("click", () => {
    if (gamePaused) return;

    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > maxRange) {
        message.textContent = `Erreur : entre un nombre entre 1 et ${maxRange}`;
        return;
    }

    attempts++;

    if (guess < secretNumber) {
        message.textContent = "C'est plus grand !";
    } else if (guess > secretNumber) {
        message.textContent = "C'est plus petit !";
    } else {
        message.textContent = `🎉 Bravo ! Tu as trouvé en ${attempts} essais !`;
        endGame();
        return;
    }

    if (attempts >= maxAttempts) {
        message.textContent = `💀 Game Over ! Le nombre était ${secretNumber}`;
        endGame();
    }

    attemptsText.textContent = `Essais : ${attempts} / ${maxAttempts}`;
    guessInput.value = "";
});

// Rejouer et changer la difficulté
restartBtn.addEventListener("click", startGame);
difficultySelect.addEventListener("change", startGame);

// Démarrage initial
startGame();
