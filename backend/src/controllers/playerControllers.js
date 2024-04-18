import Player from "../models/playerModel.js";

export const createPlayer = async (req, res) => {
  try {
    const newplayer = new Player(req.body);
    await newplayer.save();

    res.status(200).json({ message: "OK" , data:newplayer});
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
  };
  
  export const getPlayers = async (req, res) => {
    const players = await Player.find();

    res.status(200).json(players);
  };

  export const getOnePlayer = async (req, res) => {
    const id = req.params.id;
    const player = await Player.findById(id);

    res.status(200).json(player);
  };
  
  export const deletePlayer = async (req, res) => {
    // TODO: implement this function
    res.status(501).send("Unimplemented");
  };

  export const updatePlayer = async (req, res) => {
    try {
        // Extract player ID from request parameters
        const playerId = req.params.id;
        
        // Extract new position data from request body
        const { x, y } = req.body;

        // Find the player in the database by ID
        const player = await Player.findById(playerId);

        // If player not found, respond with 404 Not Found
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        // Update player's position
        player.x = x;
        player.y = y;

        // Save the updated player data to the database
        await player.save();

        // Respond with the updated player data
        res.status(200).json(player);
    } catch (error) {
        // If an error occurs, respond with 500 Internal Server Error
        res.status(500).json({ message: error.message });
    }
};

export const updateScore = async (req, res) => {
  try {
  const id = req.params.id;
  const player = await Player.findByIdAndUpdate(id , req.body);
  res.status(200).json({message : "update success" , data : player}) ;
  } catch (err) {
    res.status(500).json({message : "update failed"}) ;
    console.log(err)
  }
}