const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  facilities: [String],
  availableFrom: String,
  availableTo: String,
  status: { type: String, enum: ["AVAILABLE","MAINTENANCE"], default: "AVAILABLE" }
}, { timestamps: true });

module.exports = mongoose.model("Venue", schema);
