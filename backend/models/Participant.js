const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: { type: String, required: true, index: true },
  password: { type: String, required: true },
  organization: String,
  age: Number,
  city: String
}, { timestamps: true });

module.exports = mongoose.model("Participant", schema);
