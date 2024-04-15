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

export const getIndividualPlayers = async (req, res) => {
    // TODO: implement this function
    // res.status(501).send("Unimplemented");
    try {
    const id = req.params.id;
    const players = await Player.findById(id);
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

export const movePlayer = async (req, res) => {

    try {
      const id = req.params.id;
      const {newX , newY} = req.body;
      const player = await Player.findById(id);
      player.x = newX;
      player.y = newY;
      res.status(200).json({message : "move success" , data : player}) ;
    } catch (err) {
      res.status(500).json({message : "move failed"}) ;
      console.log(err)
    }
}