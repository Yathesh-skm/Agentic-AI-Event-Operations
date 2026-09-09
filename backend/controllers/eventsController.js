const Event = require("../models/Event");
const Registration = require("../models/Registration");

async function listEvents(req, res, next) {
  try {
    const events = await Event.find().populate("venue").sort({ date: 1 });
    const withCounts = await Promise.all(events.map(async e => ({
      ...e.toObject(),
      registrationCount: await Registration.countDocuments({
        event: e._id,
        status: { $in: ["CONFIRMED", "WAITLISTED", "REVIEW"] }
      })
    })));
    res.json(withCounts);
  } catch (e) { next(e); }
}

async function getEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id).populate("venue");
    if (!event) return res.status(404).json({ message: "Event not found." });
    const count = await Registration.countDocuments({
      event: event._id, status: { $in: ["CONFIRMED", "WAITLISTED", "REVIEW"] }
    });
    res.json({ ...event.toObject(), registrationCount: count });
  } catch (e) { next(e); }
}

module.exports = { listEvents, getEvent };
