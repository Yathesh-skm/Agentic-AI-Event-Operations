const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: "Participant" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  type: { type: String, enum: ["CONFIRMATION","REMINDER"], required: true },
  recipient: String,
  subject: String,
  body: String,
  status: { type: String, default: "QUEUED" },
  sentAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("EmailLog", schema);
