import { createCoin, getCoins, getOnePlayer, updateScore, getUserByUsername } from "./api.js";
import { getRandomSafeSpot, createName, randomFromArray } from "./utils.js";
import { createPlayer } from "./api.js";
import { obstacleCoordinates, playerColors } from "./constants.js";
import { handleLeaderboard } from "./leaderboard.js";

const playerInfo = document.querySelector(".player-info")
const gameContainer = document.querySelector(".game-container");
const leaderboardContainer = document.querySelector(".leaderboard-container");

let userName = "";
let player;
let playerID;
let score = 0;

let playable = true;
let replay=false;

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
    }, 200);
    const coinElement = document.createElement("div");
      coinElement.classList.add("Coin", "grid-cell");
      coinElement.id = `${x},${y}`;
      coinElement.dataset.position = `${x},${y}`;
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
    let debounceTimeout;
    const debounceDelay = 100;
    let {x,y} = getRandomSafeSpot();
    const existingUser = await getUserByUsername(userName);
    if (existingUser) {
      // User already exists, get the _id of the existing user
      playerID = existingUser._id;
      console.log(`User ${userName} already exists with ID: ${playerID}`);
    } else {
      // User doesn't exist, create a new one
      const payload = {
          name: userName,
      };

      const newPlayer = await createPlayer(payload);
      playerID = newPlayer.data._id;
      console.log(`Created new user ${userName} with ID: ${playerID}`);
  }
    const characterElement = document.createElement("div");
    characterElement.classList.add("Character", "grid-cell");
    characterElement.classList.add("you");
    characterElement.setAttribute("data-color", randomFromArray(playerColors));
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
          document.addEventListener("keydown", debounce(handleArrowPress, debounceDelay));
      }
      
      // Define debounced handleArrowPress function
      function debounce(func, delay) {
          return function(event) {
              clearTimeout(debounceTimeout);
              debounceTimeout = setTimeout(() => {
                  func(event);
              }, delay);
          };
      }
        
      // Define handleArrowPress function
      function handleArrowPress(event) {
        event.preventDefault();
        if (!playable) return;
          let xOffset = 0;
          let yOffset = 0;
          if (event.key === "ArrowUp") {
              yOffset = -1;
          } else if (event.key === "ArrowDown") {
              yOffset = 1;
          } else if (event.key === "ArrowLeft") {
              xOffset = -1;
              characterElement.setAttribute("data-direction","left");
          } else if (event.key === "ArrowRight") {
              xOffset = 1;
              characterElement.setAttribute("data-direction","right");
          }
          if(isValidPosition(x+xOffset, y + yOffset, obstacleCoordinates)){
            x += xOffset; // Update character's grid x position
            y += yOffset; // Update character's grid y position
            console.log("x = ",x,"y =",y);
            let newX = 16 * x + "px"; 
            let newY = 16 * y - 4 + "px"; 
            characterElement.style.transform = `translate3d(${newX}, ${newY}, 0)`;
            let newScore = tryToCollectCoin(x,y);
            characterElement.querySelector(".Character_coins").innerText = newScore;
          }
         
    }
  
    function isValidPosition(x, y, obstacleCoordinates) {
      // Check if x and y are within the map boundaries and not obstructed by any obstacle
      return (
          y>3 && y<12 && x<14 && x>0 && 
          !obstacleCoordinates.some(coord => coord.x === x && coord.y === y)
      );
  }
    function tryToCollectCoin(x,y) {
      const payload = {
        "x" : x,
        "y" : y
      };
      const coin = getCoins(payload);
      if (coin) {
        // delete coinElement
        const position = `${x},${y}`;
        const coinElement = gameContainer.querySelector(`.Coin[data-position="${position}"]`);
        if (coinElement) {
          coinElement.remove(); // Remove the coin element from the DOM
          score++;
      }
      }
      return score;
    }
  }
  export async function handleResetGame() {
    const timer = document.querySelector(".Countdown");
    timer.remove();
    gameContainer.innerHTML="";
    playable=true;
    score=0;
    replay=true;
    launchAnimation(userName);
  }

// game over animation
export async function endAnimation(countdownDiv) {
    let table;
    if (replay) {
      try {
        player = await getOnePlayer(playerID);
        if(player.score<score){
          playable = false;
        const payload = {
          name : userName,
          score : score
        };
        await updateScore(playerID, payload);
        }
        table = await handleLeaderboard(player);
        if (table) {
          // Clear any existing content
          while (leaderboardContainer.firstChild) {
            leaderboardContainer.removeChild(leaderboardContainer.firstChild);
        }
            // Append the new table
            leaderboardContainer.appendChild(table);
        } else {
            console.error("Table is null or undefined.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
    }
    playable = false;
    countdownDiv.style.backgroundColor = "red";

    var gameDiv = document.createElement("div");
    gameDiv.id = "game-over";
    gameDiv.innerText= "GameOver";
    var playAgainDiv = document.createElement("div");
    var leaderBoardDiv = document.createElement("div");


    // Create the "play again" button
    var playAgainButton = document.createElement("button");
    playAgainButton.id = "player-reset";
    playAgainButton.innerText = "Play again";

    //Create the "leader board" button
    var leaderBoardButton = document.createElement("button");
    leaderBoardButton.id = "leaderboard";
    leaderBoardButton.innerText = "Leader Board";

    // Append the button to the div
    playAgainDiv.appendChild(playAgainButton);
    leaderBoardDiv.appendChild(leaderBoardButton);

    // Append the div to the game container
    gameContainer.appendChild(gameDiv);
    gameContainer.appendChild(playAgainDiv);
    gameContainer.appendChild(leaderBoardDiv);

    playAgainButton.addEventListener("click", () => {
      score = 0;
      // after press playAgainButton, the score will be not shown.
      /*
      while (leaderboardContainer.firstChild) {
        leaderboardContainer.removeChild(leaderboardContainer.firstChild);
    }
    */
      playAgainButton.remove();
      gameDiv.remove();
      handleResetGame();
    });
    leaderBoardButton.addEventListener("click",async () => {
      let table;
      try {
        player = await getOnePlayer(playerID);
        if(player.score<score){
          playable = false;
        const payload = {
          name : userName,
          score : score
        };
        await updateScore(playerID, payload);
        }
        table = await handleLeaderboard(player);
        if (table) {
          // Clear any existing content
          while (leaderboardContainer.firstChild) {
            leaderboardContainer.removeChild(leaderboardContainer.firstChild);
        }
            // Append the new table
            leaderboardContainer.appendChild(table);
        } else {
            console.error("Table is null or undefined.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
    });
    
    player = await getOnePlayer(playerID);
    if(player.score<score){
      playable = false;
    const payload = {
      name : userName,
      score : score
    };
    await updateScore(playerID, payload);
    }

    
}

// game countdown
export async function launchGame(countdownDiv) {
    let countdown = 60;
    
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
  console.log(label);
  userName = label.value;
  if (userName == "") {
    userName = createName();
  }else{
    userName = label.value;
  }

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
