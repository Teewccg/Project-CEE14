import { createPlayer, getCoins, getPlayers, updateScore } from "../api.js";
import { getRandomSafeSpot } from "../utils.js";
import { obstacleCoordinates } from "../constants.js";
import { removedCoin } from "./coin.js";
const gameContainer = document.querySelector(".game-container");

export async function handleCreateMember(userName){
  let {x,y} = getRandomSafeSpot();
    const payload = {
      name: userName,
    };
  await createPlayer(payload);
  /*
  await createPlayer(payload);
  const players = await getPlayers();
  console.log("Player ID:", players.data[0]._id);
  label.value = "";
  */
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
      //playerElements[addedPlayer.id] = characterElement;

      //Fill in some initial state
      characterElement.querySelector(".Character_name").innerText = userName;
      characterElement.querySelector(".Character_coins").innerText = 0;
      //characterElement.setAttribute("data-color", 'red');
      //characterElement.setAttribute("data-direction", addedPlayer.direction);
      let left = 16 * x + "px";
      let top = 16 * y  + "px";
      characterElement.style.transform = `translate3d(${left}, ${top}, 0)`;
      gameContainer.appendChild(characterElement);
      
      document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
            handleArrowPress(0, -1);
            tryToCollectCoin(x,y);
        } else if (event.key === "ArrowDown") {
            handleArrowPress(0, 1);
            tryToCollectCoin(x,y);
        } else if (event.key === "ArrowLeft") {
            handleArrowPress(-1, 0);
            tryToCollectCoin(x,y);
        } else if (event.key === "ArrowRight") {
            handleArrowPress(1, 0);
            tryToCollectCoin(x,y);
        }
    });

    // Define handleArrowPress function
    function handleArrowPress(xOffset, yOffset) {
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
  function tryToCollectCoin(x,y) {
    const coins = getCoins(x,y);
    if (coins) {
      //const player = getPlayers();
      updateScore(player);
      removedCoin(x,y);
    }
  }
}