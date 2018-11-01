const numberOfGames = 3;

const game = {
   playerChoice: "",
   playerPoints: 0,
   cpuChoice: "",
   cpuPoints: 0,
   draws: 0,
}

const images = [...document.querySelectorAll('img')];
const button = document.querySelector('#play');
const partWinner = document.querySelector('#partWinner');
const playerChoiceSpan = document.querySelector('#playerChoice');
const cpuChoiceSpan = document.querySelector('#cpuChoice');
const playerWonStats = document.querySelector('#playerWonStats');
const cpuWonStats = document.querySelector('#cpuWonStats');
const drawStats = document.querySelector('#drawStats');
const summary = document.querySelector('#summary');
const totalWinner = document.querySelector('#totalWinner');
const startNewGameBtn = document.querySelector('#startNewGame');

// Player's choice event part 
images.forEach(image => {
   image.addEventListener('click', (e) => {
      game.playerChoice = e.target.dataset.option;
      images.forEach(img => {
         img.style.boxShadow = "";
      })
      image.style.boxShadow = "0 0 0 2px black";
   })
})

function randomizeCpuChoice() {
   return images[Math.floor(Math.random() * images.length)].dataset.option;
}

function whoWin(player, cpu) {
   partWinner.classList.remove('winner');
   partWinner.classList.remove('loser');
   if (player === cpu) {
      game.draws++;
      partWinner.textContent = "DRAW!";
   } else if ((player === "paper" && cpu === "rock") || (player === "rock" && cpu === "scissors") || (player === "scissors" && cpu === "paper")) {
      game.playerPoints++;
      partWinner.textContent = "YOU WON!";
      partWinner.classList.add('winner');
   } else {
      game.cpuPoints++;
      partWinner.textContent = "YOU LOST!";
      partWinner.classList.add('loser');
   }
}

function statsUpdate() {
   playerWonStats.textContent = game.playerPoints;
   cpuWonStats.textContent = game.cpuPoints;
   drawStats.textContent = game.draws;
}

function resetPlayerChoice() {
   images.forEach(img => {
      img.style.boxShadow = "";
   })
   game.playerChoice = "";
}

function endGame(player, cpu) {
   if (player === numberOfGames || cpu === numberOfGames) {
      summary.style.display = "flex";
      if (player === numberOfGames) {
         summary.style.backgroundColor = "rgba(35, 192, 61, 0.8)";
         totalWinner.textContent = `Congratulations! You won whole game!`;
      } else if (cpu === numberOfGames) {
         summary.style.backgroundColor = "rgba(192, 35, 35, 0.8)";
         totalWinner.textContent = `Unfortunately! You lost whole game!`;
      }
   }
}

function beginNewGame() {
   game.playerPoints = 0;
   game.cpuPoints = 0;
   game.draws = 0;
   partWinner.textContent = "-";
   partWinner.classList.remove('winner');
   partWinner.classList.remove('loser');
   totalWinner.textContent = "-";
   playerChoiceSpan.textContent = "-";
   cpuChoiceSpan.textContent = "-";
   statsUpdate();
   resetPlayerChoice();
   summary.style.display = "none";
}

button.addEventListener('click', (e) => {
   if (!game.playerChoice) return alert("Make up your decision before starting the game!");
   game.cpuChoice = randomizeCpuChoice();

   playerChoiceSpan.textContent = game.playerChoice;
   cpuChoiceSpan.textContent = game.cpuChoice;

   whoWin(game.playerChoice, game.cpuChoice);
   statsUpdate();
   resetPlayerChoice();

   endGame(game.playerPoints, game.cpuPoints)
})

startNewGameBtn.addEventListener('click', beginNewGame)