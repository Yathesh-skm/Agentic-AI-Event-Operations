const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  date: { type: Date, required: true },
  startTime: String,
  endTime: String,
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue" },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ["DRAFT","OPEN","CLOSED","COMPLETED"], default: "OPEN" },
  facilities: [String],
  registrationCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Event", schema);
