import { BACKEND_URL } from "../script/config.js";

export async function getPlayers() {

  const players = await fetch(`${BACKEND_URL}/players`, {
    method: "GET",
  })
  return await players.json();

}

export async function getOnePlayer(id) {
  const response = await fetch(`${BACKEND_URL}/players/${id}`, {
    method: "GET",
  })
  return await response.json();

}

export async function createPlayer(player) {
  const response = await fetch(`${BACKEND_URL}/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
  return await response.json();
}

export async function deletePlayer(id, player) {
  await fetch(`${BACKEND_URL}/players/${id}`, {
    method: "DELETE",
  });
}

export async function getCoins(coin) {
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    })
  }