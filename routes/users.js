const router = require("express").Router();
const controller = require("../controllers/user");
const { isAuthenticated } = require("../middleware/authenticate");
const validate = require('../middleware/validate');

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", isAuthenticated, validate.saveUser, controller.createUser);
router.put("/:id", isAuthenticated, validate.saveUser, controller.updateUser);
router.delete("/:id", isAuthenticated, controller.deleteUser);

module.exports = router;