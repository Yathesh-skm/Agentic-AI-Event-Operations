const router = require("express").Router();
const c = require("../controllers/registrationController");
router.post("/", c.createRegistration);
router.get("/participant/:participantId", c.participantRegistrations);
module.exports = router;
