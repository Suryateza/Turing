let winner = document.querySelector("#winner");
let loser = document.querySelector("#loser");
let finalText = document.querySelector("#final p");
let final = document.querySelector("#final");

// Function to hide the final message and reset game state
const hideFinalMessage = () => {
    setTimeout(() => {
        final.style.cssText = "display: none; height: 0;";
        winner.style.position = "static";
        resetTimer(); // Reset the timer when hiding the message
    }, 3000); // Hide after 3 seconds
};

// Function to handle game over
const gameOver = () => {
    final.style.cssText = "display: flex";
    finalText.innerHTML = "Game Over";
    hideFinalMessage(); // Hide the game over message after 3 seconds
};

// Function to start the timer
const startTimer = () => {
    gameOverTimeoutId = setTimeout(gameOver, 30000); // Set timeout for 30 seconds
};

// Function to reset the timer
const resetTimer = () => {
    clearTimeout(gameOverTimeoutId); // Clear any existing timeout
    startTimer(); // Start a new timer
};

let gameOverTimeoutId; // Variable to store the game over timeout ID

winner.addEventListener("mouseover", () => {
    let top = Math.floor(Math.random() * (window.innerHeight - 200) + 100);
    let left = Math.floor(Math.random() * (window.innerWidth - 300) + 100);
    winner.style.position = "absolute";
    winner.style.top = top + "px";
    winner.style.left = left + "px";
});

loser.addEventListener("click", () => {
    final.style.cssText = "display: flex";
    animate();
    finalText.innerHTML = "You are Loser";
    hideFinalMessage();
});

winner.addEventListener("click", () => {
    final.style.cssText = "display: flex";
    animate();
    finalText.innerHTML = "You are Really Winner !!!";
    hideFinalMessage();
});

// Function to animate the height of the #final element
const animate = () => {
    let i = 10;
    let intervalId = setInterval(() => {
        if (i >= 200) {
            clearInterval(intervalId);
        } else {
            final.style.height = i + "px";
            i++;
        }
    }, 1);
};

// Start the timer when the page loads
startTimer();
