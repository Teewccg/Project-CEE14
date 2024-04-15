import { BACKEND_URL } from "./config.js";

export async function getPlayers() {
  const players = await fetch(`${BACKEND_URL}/players`).then((r) => r.json());

  return players;
}

export async function getIndividualPlayers(id, item) {
  // TODO4: implement this function
  const player = await fetch(`${BACKEND_URL}/players/${id}`).then((r) => r.json());
  console.log(player)
  return player /* return one player */;
}

export async function createPlayer(player) {
  await fetch(`${BACKEND_URL}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
}

export async function deletePlayer(id, player) {
  await fetch(`${BACKEND_URL}/players/${id}`, {
    method: "DELETE",
  });
}

export async function getCoins() {
    const coins = await fetch(`${BACKEND_URL}/coins`).then((r) => r.json());
  
    return coins;
  }
  
  export async function createCoin(coin) {
    await fetch(`${BACKEND_URL}/coins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coin),
    });
  }
  
  export async function deleteCoin(id, coin) {
    await fetch(`${BACKEND_URL}/coins/${id}`, {
      method: "DELETE",
    });
  }

  export async function updateScore(id, player) {
    await fetch(`${BACKEND_URL}/players/${id}`, {
      method: "PUT",
    });
  }

  export async function movePlayer(id, newX, newY) {
    // Send a request to the backend to update the player's position
    // const response = await fetch(`${BACKEND_URL}/players/${id}`
    await fetch(`${BACKEND_URL}/players/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ x: newX, y: newY }),
    });
  
    /*
    if (response.ok) {
        console.log("Player moved successfully.");
    } else {
        console.error("Failed to move player:", response.statusText);
    }
    */
  }