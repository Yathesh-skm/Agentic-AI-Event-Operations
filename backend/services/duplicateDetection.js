const Participant = require("../models/Participant");
const Registration = require("../models/Registration");

function normalizePhone(phone = "") {
  return phone.replace(/\D/g, "").slice(-10);
}

function similarity(a = "", b = "") {
  a = a.toLowerCase().replace(/\s+/g, " ").trim();
  b = b.toLowerCase().replace(/\s+/g, " ").trim();
  if (!a || !b) return 0;
  if (a === b) return 1;
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  let same = 0;
  for (const ch of shorter) if (longer.includes(ch)) same++;
  return same / longer.length;
}

async function detectDuplicate({ name, email, phone, eventId, participantId }) {
  const reasons = [];
  let score = 0;

  const emailMatch = email
    ? await Participant.findOne({ email: email.toLowerCase() })
    : null;

  const phoneMatch = phone
    ? await Participant.findOne({ phone: normalizePhone(phone) })
    : null;

  if (emailMatch && String(emailMatch._id) !== String(participantId || "")) {
    score += 70;
    reasons.push("Email is already linked to another participant.");
  }

  if (phoneMatch && String(phoneMatch._id) !== String(participantId || "")) {
    score += 25;
    reasons.push("Phone number is already linked to another participant.");
  }

  const registrations = await Registration.find({ event: eventId })
    .populate("participant", "name email phone");

  for (const r of registrations) {
    if (!r.participant) continue;
    const sim = similarity(name, r.participant.name);
    if (sim >= 0.9 && String(r.participant._id) !== String(participantId || "")) {
      score += 35;
      reasons.push("Very similar participant name already registered for this event.");
      break;
    }
  }

  score = Math.min(score, 100);
  const riskLevel = score >= 70 ? "HIGH" : score >= 35 ? "MEDIUM" : "LOW";

  return { score, riskLevel, reasons };
}

module.exports = { detectDuplicate, normalizePhone };
