const Admin = require("../models/Admin");
const Participant = require("../models/Participant");
const { normalizePhone } = require("../services/duplicateDetection");

async function participantSignup(req, res, next) {
  try {
    const { name, email, phone, password, organization, age, city } = req.body;
    const exists = await Participant.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "Participant email already exists." });

    const participant = await Participant.create({
      name, email, phone: normalizePhone(phone), password, organization, age, city
    });
    res.status(201).json({ message: "Participant account created.", participant });
  } catch (e) { next(e); }
}

async function participantLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const participant = await Participant.findOne({ email: email.toLowerCase(), password });
    if (!participant) return res.status(401).json({ message: "Invalid participant credentials." });
    res.json({ message: "Login successful.", participant });
  } catch (e) { next(e); }
}

async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase(), password });
    if (!admin) return res.status(401).json({ message: "Invalid admin credentials." });
    res.json({ message: "Admin login successful.", admin });
  } catch (e) { next(e); }
}

module.exports = { participantSignup, participantLogin, adminLogin };
