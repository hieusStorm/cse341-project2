const router = require("express").Router();
const controller = require("../controllers/monster");
const validate = require('../middleware/validate');

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", validate.saveMonster, controller.createMonster);
router.put("/:id", validate.saveMonster, controller.updateMonster);
router.delete("/:id", controller.deleteMonster);

module.exports = router;