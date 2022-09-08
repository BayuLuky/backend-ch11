const gameplayController = require("../controllers/api/GameplayController");
const router = require("express").Router();
const restrict = require("../middlewares/restrict");

/**
 * @Routes "/api/gameplay"
 */

 router.all("/add", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    next();
});

router.post("/add", restrict, gameplayController.addScores);

module.exports = router;
