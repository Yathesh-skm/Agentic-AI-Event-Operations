const Speaker = require("../models/Speaker");
const { recommendSpeakers } = require("../agents/speakerAgent");

async function listSpeakers(req, res, next) {
  try { res.json(await Speaker.find().sort({ name: 1 })); }
  catch (e) { next(e); }
}

async function recommend(req, res, next) {
  try {
    const { expertise, start, end } = req.body;
    res.json(await recommendSpeakers({ expertise: expertise || [], start: new Date(start), end: new Date(end) }));
  } catch (e) { next(e); }
}

module.exports = { listSpeakers, recommend };
