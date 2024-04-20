import { getPlayers } from "./api.js";


export async function handleLeaderboard(playingPlayer) {
    let tracking = false;
    const players = await getPlayers();
    const topTenPlayers = players.sort((a, b) => b.score - a.score).slice(0, 10);
    console.log(topTenPlayers);

    // Create a table element
    const table = document.createElement('table');
    table.classList.add('leaderboard-table');

    // Create table header
    const headerRow = table.createTHead().insertRow();
    const nameHeader = headerRow.insertCell(); 
    nameHeader.textContent = 'Name'; 
    const scoreHeader = headerRow.insertCell(); 
    scoreHeader.textContent = 'Score'; 

    // Populate the table with player data
    topTenPlayers.forEach(player => {
        const row = table.insertRow();
        const nameCell = row.insertCell();
        nameCell.textContent = player.name;
        const scoreCell = row.insertCell();
        scoreCell.textContent = player.score;
        if (player._id === playingPlayer._id) {
            row.classList.add('playing-player');
        }
    });

    // Add the playing player separately if not in top ten
    if (!topTenPlayers.some(player => player._id === playingPlayer._id)) {
        const row = table.insertRow();
        const nameCell = row.insertCell();
        nameCell.textContent = playingPlayer.name;
        const scoreCell = row.insertCell();
        scoreCell.textContent = playingPlayer.score;
        row.classList.add('playing-player');
    }

    return table;
    // Append the table to a container in your HTML
    /*
    const leaderboardContainer = document.getElementById('leaderboard-container');
    leaderboardContainer.innerHTML = '';
    leaderboardContainer.appendChild(table);
    */
}