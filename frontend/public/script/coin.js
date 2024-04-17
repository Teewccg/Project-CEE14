import { createCoin, deleteCoin, getCoins } from "./api.js";
import { getKeyString, getRandomSafeSpot } from "./utils.js";
const gameContainer = document.querySelector(".game-container");

export async function handleCreateCoin() {
  let {x,y} = getRandomSafeSpot();
    console.log(x,y);
  const payload = {
    x:x,
    y:y,
  };

  await createCoin(payload);
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

export async function removedCoin(x,y) {
    const key = getKeyString(x, y);
    const coinToRemove = gameContainer[key];
    if (coinToRemove) {
      deleteCoin();
      gameContainer.removeChild(coinToRemove);
      //delete coinElements[key];
    }
}