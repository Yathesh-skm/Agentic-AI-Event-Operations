const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true, unique: true },
  checkedInAt: { type: Date, default: Date.now },
  method: { type: String, default: "QR" }
}, { timestamps: true });

module.exports = mongoose.model("CheckIn", schema);
