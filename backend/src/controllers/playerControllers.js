// TODO: you may need to import something here
import Player from "../models/playerModel.js";
import Coin from "../models/coinModel.js";

export const createPlayer = async (req, res) => {
    // TODO: implement this function
    // res.status(501).send("Unimplemented");
    try {
      const newPlayer = await Player.create(req.body);

      res.status(200).json({ message: "OK", data:newPlayer });
    } catch (err) {
      if (err.name === "ValidationError") {
        res.status(400).json({ error: "Bad Request" });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };
  
export const getPlayer = async (req, res) => {
    // TODO: implement this function
    // res.status(501).send("Unimplemented");
    try {
    const players = await Player.find();
    res.status(200).json({data:players});
    } catch (err) {
      console.log(err);
      res.status(404).json({ error : "not found"});
    };
  };
  
export const deletePlayer = async (req, res) => {
    // TODO: implement this function
    // res.status(501).send("Unimplemented");
    try {
    const id = req.params.id;
    const deletedUser = await Player.findByIdAndDelete(id);
    await Coin.deleteMany({ name: deletedUser.name })
    res.status(200).send("Player Deleted")
    } catch (err) {
      console.log(err);
      res.status(404).json({ error : "not found"});
    }
  };

export const updateScore = async (req, res) => {
    try {
    const id = req.params.id;
    const player = await Player.findByIdAndUpdate(id , {$inc : {score : 1}} , {new : true});
    res.status(200).json({message : "update success" , data : player}) ;
    } catch (err) {
      res.status(500).json({message : "update failed"}) ;
      console.log(err)
    }
}

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