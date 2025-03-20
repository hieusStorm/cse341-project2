const router = require("express").Router();
const controller = require("../controllers/user");

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", controller.createUser);

module.exports = router;