const Venue = require("../models/Venue");
const VenueBooking = require("../models/VenueBooking");

async function recommendVenues({ capacity, facilities = [], start, end }) {
  const venues = await Venue.find({ status: "AVAILABLE", capacity: { $gte: capacity } });
  const bookings = await VenueBooking.find({
    status: "BOOKED",
    start: { $lt: end },
    end: { $gt: start }
  });

  const bookedIds = new Set(bookings.map(b => String(b.venue)));
  return venues
    .filter(v => !bookedIds.has(String(v._id)))
    .map(v => {
      const matched = facilities.filter(f =>
        v.facilities.map(x => x.toLowerCase()).includes(f.toLowerCase())
      ).length;
      const capacityFit = Math.max(0, 100 - Math.round(((v.capacity - capacity) / v.capacity) * 100));
      const score = Math.min(100, Math.round(capacityFit * 0.6 + (facilities.length ? matched / facilities.length * 40 : 40)));
      return { venue: v, score, matchedFacilities: matched };
    })
    .sort((a,b) => b.score-a.score);
}

module.exports = { recommendVenues };
