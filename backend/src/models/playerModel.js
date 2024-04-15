import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  direction: {
    type: String,
    required: true,
    default: "right"
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

const Player = mongoose.model("Player", playerSchema);

export default Player;