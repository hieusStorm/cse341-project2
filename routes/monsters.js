const router = require("express").Router();
const controller = require("../controllers/monster");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", controller.createMonster);
router.put("/:id", controller.updateMonster);
router.delete("/:id", controller.deleteMonster);

module.exports = router;