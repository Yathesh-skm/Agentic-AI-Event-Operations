const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true, index: true },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true, index: true },
  registrationId: { type: String, required: true, unique: true, index: true },
  status: { type: String, enum: ["CONFIRMED","WAITLISTED","CANCELLED","REVIEW"], default: "CONFIRMED" },
  riskLevel: { type: String, enum: ["LOW","MEDIUM","HIGH"], default: "LOW" },
  riskScore: { type: Number, default: 0 },
  riskReasons: [String],
  registeredAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Registration", schema);
