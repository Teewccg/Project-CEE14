const mapData = {
    minX: 1,
    maxX: 14,
    minY: 4,
    maxY: 12,
    blockedSpaces: {
      "7x4": true,
      "1x11": true,
      "12x10": true,
      "4x7": true,
      "5x7": true,
      "6x7": true,
      "8x6": true,
      "9x6": true,
      "10x6": true,
      "7x9": true,
      "8x9": true,
      "9x9": true,
    },
  };
  
  // Options for Player Colors... these are in the same order as our sprite sheet
  const playerColors = ["blue", "red", "orange", "yellow", "green", "purple"];
  const obstacleCoordinates=[
    { x: 1, y: 11 },
    { x: 4, y: 7 },
    { x: 5, y: 7 },
    { x: 6, y: 7 },
    { x: 7, y: 4 },
    { x: 7, y: 9 },
    { x: 8, y: 6 },
    { x: 8, y: 9 },
    { x: 9, y: 6 },
    { x: 9, y: 9 },
    { x: 10, y: 6 },
    { x: 12, y: 10 },]
  export { mapData , playerColors,obstacleCoordinates};