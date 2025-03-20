const router = require("express").Router();
const controller = require("../controllers/monster");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", controller.createMonster);

module.exports = router;