import Coin from '../models/coinModel.js';
export const createCoin = async (req, res) => {
  try {
    const newcoin = new Coin(req.body);
    await newcoin.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
  };
  
  export const getCoins = async (req, res) => {
    const {x,y} = req.query;
    try {
      const coin = await Coin.find({x,y});
      res.status(200).json(coin);
      console.log({x,y});
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
      console.error('Error retrieving coins:', err);
    }
  };
  
  export const deleteCoin = async (req, res) => {
    // TODO: implement this function
    // res.status(501).send("Unimplemented");
    try {
      const id = req.params.id;
      const deletedCoin = await Coin.findByIdAndDelete(id);
      console.log(deletedCoin);
      res.status(200).send("coin Deleted")
    } catch (err) {
      console.log(err);
      res.status(404).json({ error : "not found"});
    }
  };