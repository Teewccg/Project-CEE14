import { launchAnimation } from "/script/321.js";

const playerInfo = document.querySelector(".player-info")
let userName;

document.addEventListener("DOMContentLoaded", () => {
  
  const addMemberButton = document.getElementById("player-confirm"); //get start game button
  // when click button

  addMemberButton.addEventListener("click", () => {
    const label = document.getElementById("player-name");
    // disable input name
    label.disabled = true;
    // remove button
    addMemberButton.remove();

    launchAnimation();
  });
});
