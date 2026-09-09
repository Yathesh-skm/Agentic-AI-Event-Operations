const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  start: Date,
  end: Date,
  status: { type: String, enum: ["BOOKED","CANCELLED"], default: "BOOKED" }
}, { timestamps: true });

module.exports = mongoose.model("VenueBooking", schema);
