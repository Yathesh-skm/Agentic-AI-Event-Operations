const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true, unique: true },
  checkedOutAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("CheckOut", schema);
