const crypto = require("crypto");
const Event = require("../models/Event");
const Participant = require("../models/Participant");
const Registration = require("../models/Registration");
const QRPass = require("../models/QRPass");
const EmailLog = require("../models/EmailLog");
const { detectDuplicate } = require("../services/duplicateDetection");
const QRCode = require("qrcode");

async function createRegistration(req, res, next) {
  try {
    const { eventId, participantId } = req.body;
    const [event, participant] = await Promise.all([
      Event.findById(eventId),
      Participant.findById(participantId)
    ]);

    if (!event || !participant) return res.status(404).json({ message: "Event or participant not found." });

    const existing = await Registration.findOne({
      event: eventId,
      participant: participantId,
      status: { $ne: "CANCELLED" }
    });
    if (existing) return res.status(409).json({ message: "This participant is already registered for this event.", registration: existing });

    const duplicate = await detectDuplicate({
      name: participant.name,
      email: participant.email,
      phone: participant.phone,
      eventId,
      participantId
    });

    if (duplicate.riskLevel === "HIGH") {
      return res.status(409).json({
        message: "Registration flagged as HIGH risk by the Registration Agent.",
        risk: duplicate
      });
    }

    const confirmed = await Registration.countDocuments({ event: eventId, status: "CONFIRMED" });
    const status = confirmed >= event.capacity ? "WAITLISTED" : "CONFIRMED";
    const registrationId = "REG-" + crypto.randomBytes(5).toString("hex").toUpperCase();

    const registration = await Registration.create({
      event: eventId,
      participant: participantId,
      registrationId,
      status,
      riskLevel: duplicate.riskLevel,
      riskScore: duplicate.score,
      riskReasons: duplicate.reasons
    });

    const qrData = JSON.stringify({
      registrationId,
      eventId: String(eventId),
      participantId: String(participantId)
    });
    const qrImage = await QRCode.toDataURL(qrData);
    await QRPass.create({ registration: registration._id, qrData, qrImage });

    await EmailLog.create({
      participant: participantId,
      event: eventId,
      registration: registration._id,
      type: "CONFIRMATION",
      recipient: participant.email,
      subject: `Registration confirmation - ${event.title}`,
      body: `Registration ${registrationId} is ${status}.`,
      status: "QUEUED"
    });

    res.status(201).json({
      message: status === "CONFIRMED" ? "Registration successful." : "Event is full. Participant added to waitlist.",
      registration,
      qrImage
    });
  } catch (e) { next(e); }
}

async function participantRegistrations(req, res, next) {
  try {
    const rows = await Registration.find({ participant: req.params.participantId })
      .populate("event", "title date startTime endTime capacity")
      .sort({ createdAt: -1 });
    res.json(rows);
  } catch (e) { next(e); }
}

module.exports = { createRegistration, participantRegistrations };
