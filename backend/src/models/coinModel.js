import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});

const Coin = mongoose.model("Coin", itemSchema);

export default Coin;