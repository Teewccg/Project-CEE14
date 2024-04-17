import { createCoin, deleteCoin, getCoins } from "./api.js";
import { getRandomSafeSpot } from "./utils.js";
import { createPlayer } from "./api.js";
import { obstacleCoordinates } from "./constants.js";

const playerInfo = document.querySelector(".player-info")
const gameContainer = document.querySelector(".game-container");
let playable = true;
let userName;

// create a coin constantly
export async function handleCreateCoin() {
    let {x,y} = getRandomSafeSpot();
      console.log(x,y);
    const payload = {
      x:x,
      y:y,
    };
  
    await createCoin(payload);
    if(playable){
      setTimeout(async () => {
      await handleCreateCoin();
    }, 3000);
    const coinElement = document.createElement("div");
      coinElement.classList.add("Coin", "grid-cell");
      coinElement.innerHTML = `
          <div class="Coin_shadow grid-cell"></div>
          <div class="Coin_sprite grid-cell"></div>
        `;
  
        // Position the Element
      const left = 16 * x + "px";
      const top = 16 * y - 4 + "px";
      coinElement.style.transform = `translate3d(${left}, ${top}, 0)`;
  
      gameContainer.appendChild(coinElement);
    }
    
  
}

// create a player character
export async function handleCreateMember(userName){
    let {x,y} = getRandomSafeSpot();
      const payload = {
        name: userName,
      };
    await createPlayer(payload);
    const characterElement = document.createElement("div");
    characterElement.classList.add("Character", "grid-cell");
    characterElement.classList.add("you");
    characterElement.innerHTML = (`
          <div class="Character_shadow grid-cell"></div>
          <div class="Character_sprite grid-cell"></div>
          <div class="Character_name-container">
            <span class="Character_name"></span>
            <span class="Character_coins">0</span>
          </div>
          <div class="Character_you-arrow"></div>
    `);
        
        characterElement.querySelector(".Character_name").innerText = userName;
        characterElement.querySelector(".Character_coins").innerText = 0;
        let left = 16 * x + "px";
        let top = 16 * y - 4  + "px";
        characterElement.style.transform = `translate3d(${left}, ${top}, 0)`;
        gameContainer.appendChild(characterElement);

        if (playable) {
          document.addEventListener("keydown", handleArrowPress);
      }else{
        console.log("K");
      }
        
      // Define handleArrowPress function
      function handleArrowPress(event) {
        if (!playable) return;
          let xOffset = 0;
          let yOffset = 0;
          if (event.key === "ArrowUp") {
              yOffset = -1;
          } else if (event.key === "ArrowDown") {
              yOffset = 1;
          } else if (event.key === "ArrowLeft") {
              xOffset = -1;
          } else if (event.key === "ArrowRight") {
              xOffset = 1;
          }
          if(isValidPosition(x+xOffset, y + yOffset, obstacleCoordinates)){
            x += xOffset; // Update character's grid x position
            y += yOffset; // Update character's grid y position
            console.log("x = ",x,"y =",y);
            let newX = 16 * x + "px"; 
            let newY = 16 * y - 4 + "px"; 
            characterElement.style.transform = `translate3d(${newX}, ${newY}, 0)`;
          }
         
    }
  
    function isValidPosition(x, y, obstacleCoordinates) {
      // Check if x and y are within the map boundaries and not obstructed by any obstacle
      return (
          y>3 && y<12 && x<14 && x>0 && 
          !obstacleCoordinates.some(coord => coord.x === x && coord.y === y)
      );
  }
  }
  export async function handleResetGame() {
    const timer = document.querySelector(".Countdown");
    timer.remove();
    gameContainer.innerHTML="";
    playable=true;
    launchAnimation(userName);
  }

// game over animation
export async function endAnimation(countdownDiv) {
    countdownDiv.style.backgroundColor = "red";

    var gameDiv = document.createElement("div");
    gameDiv.id = "game-over";
    gameDiv.innerText= "GameOver";
    var playAgainDiv = document.createElement("div");

    // Create the "play again" button
    var playAgainButton = document.createElement("button");
    playAgainButton.id = "player-reset";
    playAgainButton.innerText = "Play again";

    // Append the button to the div
    playAgainDiv.appendChild(playAgainButton);

    // Append the div to the game container
    gameContainer.appendChild(gameDiv);
    gameContainer.appendChild(playAgainDiv);

    playAgainButton.addEventListener("click", () => {
      playAgainButton.remove();
      gameDiv.remove();
      handleResetGame();
    });
    
    playable = false;
}

// game countdown
export async function launchGame(countdownDiv) {
    let countdown = 10;
    
    if (!countdownDiv) {
        console.error("Element with class 'Countdown' not found.");
        return; // Exit the function if timer is null
    }
    
    var countdownInterval = setInterval(function() {
        const minutes = Math.floor(countdown / 60);
        let seconds = countdown % 60;
        countdownDiv.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval); // Stop the countdown when it reaches zero
            // Add code to handle game launch here
            endAnimation(countdownDiv);
        }
    }, 1000); // 1000 milliseconds = 1 second
}

// 3 2 1 start game
export async function launchAnimation() {

  const label = document.getElementById("player-name");
  userName = label.value;
  // create countdown box
  var countdownDiv = document.createElement("div");
  countdownDiv.className = "Countdown";
  countdownDiv.innerText = "01:00";
  playerInfo.appendChild(countdownDiv);
  // make the transition smoother
  void countdownDiv.offsetWidth;
  countdownDiv.style.opacity = "1";

    // Create a div for the number
    var numberDiv = document.createElement("div");
    numberDiv.className = "Number";
    gameContainer.appendChild(numberDiv);

    var countdown = 3;

    // Update the text content every 3 seconds
    var countdownInterval = setInterval(function() {
        if (countdown > 0) {
            numberDiv.innerText = countdown;
            countdown--;
        } else {
            clearInterval(countdownInterval); // Stop the countdown interval
            numberDiv.innerText = "Start";

            gameContainer.removeChild(numberDiv);
            // Call the functions after the "Start" text disappears
            handleCreateMember(userName);
            handleCreateCoin();
            launchGame(countdownDiv);
        }
    }, 1500); // 3000 milliseconds = 3 seconds
    
}
