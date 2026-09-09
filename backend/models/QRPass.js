const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true, unique: true },
  qrData: { type: String, required: true },
  qrImage: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("QRPass", schema);
