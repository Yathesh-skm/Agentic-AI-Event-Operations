const Registration = require("../models/Registration");
const Participant = require("../models/Participant");
const Event = require("../models/Event");

async function registrationInsights(eventId) {
  const registrations = await Registration.find({ event: eventId }).populate("participant");
  const total = registrations.length;
  const confirmed = registrations.filter(r => r.status === "CONFIRMED").length;
  const waitlisted = registrations.filter(r => r.status === "WAITLISTED").length;
  const highRisk = registrations.filter(r => r.riskLevel === "HIGH").length;

  const cities = {};
  for (const r of registrations) {
    const city = r.participant?.city || "Unknown";
    cities[city] = (cities[city] || 0) + 1;
  }

  const event = await Event.findById(eventId);
  const utilization = event ? Math.round((confirmed / event.capacity) * 100) : 0;

  return {
    agent: "Registration Agent",
    total,
    confirmed,
    waitlisted,
    highRisk,
    capacity: event?.capacity || 0,
    utilization,
    topCities: Object.entries(cities).sort((a,b) => b[1]-a[1]).slice(0,5)
  };
}

module.exports = { registrationInsights };
