import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "you",
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
});

const Player = mongoose.model("Player", itemSchema);

export default Player;