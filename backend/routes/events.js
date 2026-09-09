const router = require("express").Router();
const c = require("../controllers/eventsController");
router.get("/", c.listEvents);
router.get("/:id", c.getEvent);
module.exports = router;
