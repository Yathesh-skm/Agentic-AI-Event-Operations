const Event = require("../models/Event");
const Registration = require("../models/Registration");
const EmailLog = require("../models/EmailLog");

async function createUpcomingReminders() {
  const now = new Date();
  const from = new Date(now.getTime() + 6.5 * 24 * 60 * 60 * 1000);
  const to = new Date(now.getTime() + 7.5 * 24 * 60 * 60 * 1000);

  const events = await Event.find({ date: { $gte: from, $lte: to } });
  let created = 0;

  for (const event of events) {
    const regs = await Registration.find({
      event: event._id,
      status: "CONFIRMED"
    }).populate("participant");

    for (const reg of regs) {
      if (!reg.participant) continue;
      const exists = await EmailLog.findOne({
        registration: reg._id,
        type: "REMINDER"
      });
      if (exists) continue;

      await EmailLog.create({
        participant: reg.participant._id,
        event: event._id,
        registration: reg._id,
        type: "REMINDER",
        recipient: reg.participant.email,
        subject: `Reminder: ${event.title} is one week away`,
        body: `Your event "${event.title}" is scheduled for ${event.date.toDateString()}.`,
        status: "QUEUED"
      });
      created++;
    }
  }
  return created;
}

function startReminderScheduler() {
  createUpcomingReminders().catch(console.error);
  setInterval(() => createUpcomingReminders().catch(console.error), 60 * 60 * 1000);
}

module.exports = { startReminderScheduler, createUpcomingReminders };
