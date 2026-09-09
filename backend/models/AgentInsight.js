const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  agent: { type: String, enum: ["REGISTRATION","VENUE","SPEAKER"], required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  level: { type: String, enum: ["INFO","WARNING","CRITICAL"], default: "INFO" },
  title: String,
  message: String,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model("AgentInsight", schema);
