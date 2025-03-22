const router = require("express").Router();
const controller = require("../controllers/user");
const validate = require('../middleware/validate');

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", validate.saveUser, controller.createUser);
router.put("/:id", validate.saveUser, controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;