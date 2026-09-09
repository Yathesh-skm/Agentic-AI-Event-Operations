const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  title: { type: String, required: true },
  description: String,
  room: String,
  start: Date,
  end: Date,
  capacity: Number,
  speaker: { type: mongoose.Schema.Types.ObjectId, ref: "Speaker" },
  registeredCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Session", schema);
