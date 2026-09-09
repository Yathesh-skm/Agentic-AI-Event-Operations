const router = require("express").Router();
const c = require("../controllers/speakerController");
router.get("/", c.listSpeakers);
router.post("/recommend", c.recommend);
module.exports = router;
