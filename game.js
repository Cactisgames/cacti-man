// Get elements
const pacman = document.getElementById("pacman");
const banana = document.getElementById("banana");
const ghosts = document.querySelectorAll(".ghost");
const scoreDisplay = document.getElementById("score");

// Game variables
let pacmanX = 240, pacmanY = 240; // Starting position of Pac-Man
let score = 0;
let gameOver = false;

// Move Pac-Man
document.addEventListener("keydown", (event) => {
    if (gameOver) return;

    // Arrow keys for movement
    if (event.key === "ArrowLeft") pacmanX -= 30;
    if (event.key === "ArrowRight") pacmanX += 30;
    if (event.key === "ArrowUp") pacmanY -= 30;
    if (event.key === "ArrowDown") pacmanY += 30;

    // Check if Pac-Man goes out of bounds
    if (pacmanX < 0) pacmanX = 480;
    if (pacmanX > 480) pacmanX = 0;
    if (pacmanY < 0) pacmanY = 480;
    if (pacmanY > 480) pacmanY = 0;

    // Update Pac-Man's position
    pacman.style.left = pacmanX + "px";
    pacman.style.top = pacmanY + "px";

    // Check if Pac-Man eats the banana
    if (Math.abs(pacmanX - banana.offsetLeft) < 30 && Math.abs(pacmanY - banana.offsetTop) < 30) {
        score += 10;
        scoreDisplay.textContent = "Score: " + score;
        resetBanana(); // Reset banana position
    }

    // Check if Pac-Man collides with any ghost
    ghosts.forEach((ghost) => {
        if (Math.abs(pacmanX - ghost.offsetLeft) < 30 && Math.abs(pacmanY - ghost.offsetTop) < 30) {
            gameOver = true;
            alert("Game Over! You were caught by a ghost!");
            resetGame(); // Reset the game
        }
    });
});

// Move ghosts randomly
function moveGhosts() {
    ghosts.forEach((ghost) => {
        let randomDirection = Math.floor(Math.random() * 4);

        if (randomDirection === 0) ghost.style.left = (parseInt(ghost.style.left) - 30) + "px"; // Move left
        if (randomDirection === 1) ghost.style.left = (parseInt(ghost.style.left) + 30) + "px"; // Move right
        if (randomDirection === 2) ghost.style.top = (parseInt(ghost.style.top) - 30) + "px"; // Move up
        if (randomDirection === 3) ghost.style.top = (parseInt(ghost.style.top) + 30) + "px"; // Move down

        // Keep ghosts within bounds
        if (parseInt(ghost.style.left) < 0) ghost.style.left = "0px";
        if (parseInt(ghost.style.left) > 480) ghost.style.left = "480px";
        if (parseInt(ghost.style.top) < 0) ghost.style.top = "0px";
        if (parseInt(ghost.style.top) > 480) ghost.style.top = "480px";
    });
}

// Reset banana position
function resetBanana() {
    banana.style.left = Math.floor(Math.random() * 16) * 30 + "px";
    banana.style.top = Math.floor(Math.random() * 16) * 30 + "px";
}

// Reset game
function resetGame() {
    pacmanX = 240;
    pacmanY = 240;
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = "Score: " + score;

    ghosts.forEach((ghost) => {
        ghost.style.left = Math.floor(Math.random() * 16) * 30 + "px";
        ghost.style.top = Math.floor(Math.random() * 16) * 30 + "px";
    });

    // Move Pac-Man back to center
    pacman.style.left = pacmanX + "px";
    pacman.style.top = pacmanY + "px";
    resetBanana();
}

// Start ghost movement
setInterval(moveGhosts, 500);
