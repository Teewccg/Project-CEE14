import { handleCreateMember} from "./player.js";
import { handleCreateCoin } from "./coin.js";
import { movePlayer } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const addMemberButton = document.getElementById("player-confirm"); // Change this to the correct ID
  addMemberButton.addEventListener("click", () => {
    console.log("HI");
    handleCreateMember();
    handleCreateCoin();
  });
  gameContainer.addEventListener("click", (event) => {
    const rect = gameContainer.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        
        // Calculate new position based on click coordinates
        const newX = Math.floor(offsetX / 16);
        const newY = Math.floor(offsetY / 16);

        // Move the player to the new position
        movePlayer(newX, newY);
  });
});
