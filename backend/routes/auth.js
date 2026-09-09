const router = require("express").Router();
const c = require("../controllers/authController");
router.post("/participant/signup", c.participantSignup);
router.post("/participant/login", c.participantLogin);
router.post("/admin/login", c.adminLogin);
module.exports = router;
