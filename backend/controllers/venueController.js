const Venue = require("../models/Venue");
const VenueBooking = require("../models/VenueBooking");
const { recommendVenues } = require("../agents/venueAgent");

async function listVenues(req, res, next) {
  try { res.json(await Venue.find().sort({ capacity: 1 })); }
  catch (e) { next(e); }
}

async function recommend(req, res, next) {
  try {
    const { capacity, facilities, start, end } = req.body;
    res.json(await recommendVenues({ capacity: Number(capacity), facilities: facilities || [], start: new Date(start), end: new Date(end) }));
  } catch (e) { next(e); }
}

async function bookings(req, res, next) {
  try {
    res.json(await VenueBooking.find().populate("venue event").sort({ start: 1 }));
  } catch (e) { next(e); }
}

module.exports = { listVenues, recommend, bookings };
