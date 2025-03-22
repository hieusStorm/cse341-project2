const router = require("express").Router();

router.get("/", (req, res) => {
    //#swagger.tags=['Welcome Api']
    res.send("Welcome to my api");
});

router.use("/monsters", require("./monsters"));
router.use("/users", require("./users"));

module.exports = router;