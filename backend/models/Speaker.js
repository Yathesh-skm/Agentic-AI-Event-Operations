const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  email: String,
  expertise: [String],
  organization: String,
  availableFrom: String,
  availableTo: String,
  status: { type: String, enum: ["AVAILABLE","UNAVAILABLE"], default: "AVAILABLE" }
}, { timestamps: true });

module.exports = mongoose.model("Speaker", schema);
