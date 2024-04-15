import { handleCreateMember} from "./player.js";
import { handleCreateCoin } from "./coin.js";
import { movePlayer } from "./api.js";
import { getRandomSafeSpot } from "./utils.js";

let userName;

document.addEventListener("DOMContentLoaded", () => {
  
  const addMemberButton = document.getElementById("player-confirm"); // Change this to the correct ID
  addMemberButton.addEventListener("click", () => {
  console.log("HI");
    const label = document.getElementById("player-name");
    userName = label.value;
    console.log("Input Value:", userName);
    const {x,y} = getRandomSafeSpot();
    const payload = {
      name: userName,
    };
    label.disabled = true;
    addMemberButton.disabled = true;
    addMemberButton.style.visibility = "hidden";
    handleCreateMember(userName,x,y,payload);
    
    handleCreateCoin();
  });
});
