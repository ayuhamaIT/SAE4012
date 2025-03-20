const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

let score = 0;
let gameRunning = true;
const leaderboard = document.getElementById("leaderboard");
const scoreBoard = document.getElementById("scoreBoard");

const playerImage = new Image();
playerImage.src = "./assets/bouclier.png";

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 100,
    speed: 5,
};

const bullets = [];
const keys = {};
let gameLoopRunning = false;

function spawnBullet() {
    let size = Math.random() * 30 + 50; 
    let speedMultiplier = 1 + score / 1000; 
    let spawnRate = Math.max(1000 - score * 2, 300);

    const side = Math.floor(Math.random() * 4);
    let x, y, dx, dy;

    if (side === 0) { x = Math.random() * canvas.width; y = -size; dx = (Math.random() - 0.5) * 5; dy = Math.random() * 3 + 2 * speedMultiplier; } // Haut
    else if (side === 1) { x = Math.random() * canvas.width; y = canvas.height + size; dx = (Math.random() - 0.5) * 5; dy = -(Math.random() * 3 + 2 * speedMultiplier); } // Bas
    else if (side === 2) { x = -size; y = Math.random() * canvas.height; dx = Math.random() * 3 + 2 * speedMultiplier; dy = (Math.random() - 0.5) * 5; } // Gauche
    else { x = canvas.width + size; y = Math.random() * canvas.height; dx = -(Math.random() * 3 + 2 * speedMultiplier); dy = (Math.random() - 0.5) * 5; } // Droite
    
    bullets.push({ x, y, dx, dy, size, color: "#FF0000" });

    setTimeout(spawnBullet, spawnRate);
}

function checkCollision(player, bullet) {
    let playerRadius = player.size / 2;
    let bulletRadius = bullet.size / 2;

    let dx = (player.x + playerRadius) - bullet.x;
    let dy = (player.y + playerRadius) - bullet.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    return distance < (playerRadius + bulletRadius);
}

function update() {
    if (!gameRunning) return;
    score++;
    scoreBoard.textContent = "Score: " + score;

    if (keys["ArrowUp"] || keys["z"]) player.y -= player.speed;
    if (keys["ArrowDown"] || keys["s"]) player.y += player.speed;
    if (keys["ArrowLeft"] || keys["q"]) player.x -= player.speed;
    if (keys["ArrowRight"] || keys["d"]) player.x += player.speed;
    
    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
    
    bullets.forEach((bullet, index) => {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;

        if (bullet.x + bullet.size < 0 || bullet.x - bullet.size > canvas.width ||
            bullet.y + bullet.size < 0 || bullet.y - bullet.size > canvas.height) {
            bullets.splice(index, 1);
        }

        if (checkCollision(player, bullet)) {
            gameOver();
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerImage, player.x, player.y, player.size, player.size);

    bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.size / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function gameLoop() {
    if (!gameLoopRunning) return;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function startGameLoop() {
    if (!gameLoopRunning) {
        gameLoopRunning = true;
        gameLoop();
    }
}

function gameOver() {
    gameRunning = false;
    gameLoopRunning = false;
    const pseudo = prompt("Entrez votre pseudo :") || "Joueur inconnu";
    const email = prompt("Entrez votre EMAIL :") || "email inconnu";

    sendScore(pseudo, email, score);
    alert("Score: " + score);
    updateLeaderboard(pseudo, score);
    setTimeout(() => document.location.reload(), 1000);
}

function sendScore(pseudo, email, score) {
    fetch("save_score.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, email, score })
    })
    .then(response => response.json())
    .then(data => console.log("Réponse serveur:", data))
    .catch(error => console.error("Erreur fetch:", error));
}

// Fonction pour mettre à jour le leaderboard
function updateLeaderboard(pseudo, newScore) {
    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    // Ajouter un objet avec le pseudo et le score
    leaderboardData.push({ pseudo: pseudo, score: newScore });
    
    // Trier par score décroissant
    leaderboardData.sort((a, b) => b.score - a.score);
    
    // Limiter à 5 résultats
    leaderboardData = leaderboardData.slice(0, 5);
    
    // Sauvegarder dans le localStorage avec le pseudo et le score
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
    
    // Mettre à jour l'affichage du leaderboard
    let leaderboardHTML = "Leaderboard:<br>";
    leaderboardData.forEach(entry => {
        leaderboardHTML += `${entry.pseudo} - Score: ${entry.score}<br>`;
    });
    
    document.getElementById("leaderboard").innerHTML = leaderboardHTML;
}

// Gérer l'envoi du formulaire
document.getElementById("score-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const pseudo = document.getElementById("pseudo").value;
    const score = parseInt(document.getElementById("score").value);
    
    if (pseudo && !isNaN(score)) {
        updateLeaderboard(pseudo, score);
        
        // Réinitialiser les champs du formulaire après la soumission
        document.getElementById("pseudo").value = "";
        document.getElementById("score").value = "";
    }
});

// Afficher le leaderboard au chargement de la page
window.onload = function() {
    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    let leaderboardHTML = "Leaderboard:<br>";
    leaderboardData.forEach(entry => {
        leaderboardHTML += `${entry.pseudo} - Score: ${entry.score}<br>`;
    });
    
    document.getElementById("leaderboard").innerHTML = leaderboardHTML;
};


// Charger le leaderboard au démarrage
document.addEventListener("DOMContentLoaded", () => {
    let scores = localStorage.getItem("leaderboard");
    if (scores) {
        scores = JSON.parse(scores);
        scores.forEach(entry => updateLeaderboard(entry.pseudo, entry.score));
    }
});


window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

window.addEventListener("keydown", function(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }
});

// Initialisation
spawnBullet();
startGameLoop();
updateLeaderboard(0);
