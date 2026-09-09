const Speaker = require("../models/Speaker");
const Session = require("../models/Session");

async function recommendSpeakers({ expertise = [], start, end }) {
  const speakers = await Speaker.find({ status: "AVAILABLE" });
  const sessions = await Session.find({
    start: { $lt: end },
    end: { $gt: start },
    speaker: { $ne: null }
  });

  const busy = new Set(sessions.map(s => String(s.speaker)));

  return speakers
    .filter(s => !busy.has(String(s._id)))
    .map(s => {
      const matches = expertise.filter(e =>
        s.expertise.some(x => x.toLowerCase() === e.toLowerCase())
      ).length;
      const score = expertise.length ? Math.round(matches / expertise.length * 100) : 50;
      return { speaker: s, score };
    })
    .sort((a,b) => b.score-a.score);
}

module.exports = { recommendSpeakers };
