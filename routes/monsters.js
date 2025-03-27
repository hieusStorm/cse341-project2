const router = require("express").Router();
const controller = require("../controllers/monster");
const { isAuthenticated } = require("../middleware/authenticate");
const validate = require('../middleware/validate');

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", isAuthenticated, validate.saveMonster, controller.createMonster);
router.put("/:id", isAuthenticated, validate.saveMonster, controller.updateMonster);
router.delete("/:id", isAuthenticated, controller.deleteMonster);

module.exports = router;