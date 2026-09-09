const router = require("express").Router();
const c = require("../controllers/venueController");
router.get("/", c.listVenues);
router.post("/recommend", c.recommend);
router.get("/bookings", c.bookings);
module.exports = router;
