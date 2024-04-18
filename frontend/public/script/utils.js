import { mapData } from './constants.js';
function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  function getKeyString(x, y) {
    return `${x}x${y}`;
}
  
function createName() {
    const prefix = randomFromArray([
      "COOL",
      "SUPER",
      "HIP",
      "SMUG",
      "COOL",
      "SILKY",
      "GOOD",
      "SAFE",
      "DEAR",
      "DAMP",
      "WARM",
      "RICH",
      "LONG",
      "DARK",
      "SOFT",
      "BUFF",
      "DOPE",
    ]);
    const animal = randomFromArray([
      "BEAR",
      "DOG",
      "CAT",
      "FOX",
      "LAMB",
      "LION",
      "BOAR",
      "GOAT",
      "VOLE",
      "SEAL",
      "PUMA",
      "MULE",
      "BULL",
      "BIRD",
      "BUG",
    ]);
    return `${prefix} ${animal}`;
}
  
function isSolid(x,y) {
  
    const blockedNextSpace = mapData.blockedSpaces[getKeyString(x, y)];
    return (
      blockedNextSpace ||
      x >= mapData.maxX ||
      x < mapData.minX ||
      y >= mapData.maxY ||
      y < mapData.minY
    )
}
  
function getRandomSafeSpot() {
    //We don't look things up by key here, so just return an x/y
    return randomFromArray([
      { x: 1, y: 4 },{ x: 1, y: 5 },{ x: 1, y: 6 },{ x: 1, y: 7 },{ x: 1, y: 8 },{ x: 1, y: 9 },{ x: 1, y: 10 },
      { x: 2, y: 4 },{ x: 2, y: 5 },{ x: 2, y: 6 },{ x: 2, y: 7 },{ x: 2, y: 8 },{ x: 2, y: 9 },{ x: 2, y: 10 },{ x: 2, y: 11 },
      { x: 3, y: 4 },{ x: 3, y: 5 },{ x: 3, y: 6 },{ x: 3, y: 7 },{ x: 3, y: 8 },{ x: 3, y: 9 },{ x: 3, y: 10 },{ x: 3, y: 11 },
      { x: 4, y: 4 },{ x: 4, y: 5 },{ x: 4, y: 6 },{ x: 4, y: 8 },{ x: 4, y: 9 },{ x: 4, y: 10 },{ x: 4, y: 11 },
      { x: 5, y: 4 },{ x: 5, y: 5 },{ x: 5, y: 6 },{ x: 5, y: 8 },{ x: 5, y: 9 },{ x: 5, y: 10 },{ x: 5, y: 11 },
      { x: 6, y: 4 },{ x: 6, y: 5 },{ x: 6, y: 6 },{ x: 6, y: 8 },{ x: 6, y: 9 },{ x: 6, y: 10 },{ x: 6, y: 11 },
      { x: 7, y: 5 },{ x: 7, y: 6 },{ x: 7, y: 7 },{ x: 7, y: 8 },{ x: 7, y: 10 },{ x: 7, y: 11 },
      { x: 8, y: 4 },{ x: 8, y: 5 },{ x: 8, y: 7 },{ x: 8, y: 8 },{ x: 8, y: 10 },{ x: 8, y: 11 },
      { x: 9, y: 4 },{ x: 9, y: 5 },{ x: 9, y: 7 },{ x: 9, y: 8 },{ x: 9, y: 10 },{ x: 9, y: 11 },
      { x: 10, y: 4 },{ x: 10, y: 5 },{ x: 10, y: 7 },{ x: 10, y: 8 },{ x: 10, y: 9 },{ x: 10, y: 10 },{ x: 10, y: 11 },
      { x: 11, y: 4 },{ x: 11, y: 5 },{ x: 11, y: 6 },{ x: 11, y: 7 },{ x: 11, y: 8 },{ x: 11, y: 9 },{ x: 11, y: 10 },{ x: 11, y: 11 },
      { x: 12, y: 4 },{ x: 12, y: 5 },{ x: 12, y: 6 },{ x: 12, y: 7 },{ x: 12, y: 8 },{ x: 12, y: 9 },{ x: 12, y: 11 },
      { x: 13, y: 4 },{ x: 13, y: 5 },{ x: 13, y: 6 },{ x: 13, y: 7 },{ x: 13, y: 8 },{ x: 13, y: 9 },{ x: 13, y: 10 },{ x: 13, y: 11 },
    ]);
}

export { randomFromArray, getKeyString, isSolid, getRandomSafeSpot, createName};