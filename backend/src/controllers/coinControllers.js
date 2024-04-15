import Coin from "../models/coinModel.js";

export const createCoin = async (req, res) => {
  try {
    const newCoin = await Coin.create(req.body);

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
  const coins = await Coin.find();

  res.status(200).json(coins);
};

export const deleteCoin = async (req, res) => {
  // TODO2: implement this function
  // HINT: you can serve the internet and find what method to use for deleting item.
  // res.status(501).send("Unimplemented");
  const id = req.params.id;
  const [x,y] = id.split('x');
  console.log(x,y);
  const deletedCoin = await Coin.findOneAndDelete({"x" : x, "y" : y});
  res.status(200).send("coin Deleted")
};

