import { launchAnimation } from "/script/321.js";

const playerInfo = document.querySelector(".player-info")
let userName;

document.addEventListener("DOMContentLoaded", () => {
  
  const addMemberButton = document.getElementById("player-confirm"); //get start game button
  // when click button

  addMemberButton.addEventListener("click", () => {
    const label = document.getElementById("player-name");
    userName = label.value;
    if (userName == "") {
      alert("Please enter your name.");
    }else{
    // disable input name
    label.disabled = true;
    // remove button
    addMemberButton.remove();

    launchAnimation();
    }
    
  });
});
