const router = require("express").Router();
const gameController = require("../controllers/api/GameController");

router.get("/", gameController.getGames);
router.post("/", gameController.createGame);
router.get("/:id", gameController.getGameById);
router.get("/:id/gameboard", gameController.getLeaderboardByGame);
router.get("/:id/userboard", gameController.getLeaderboardByUser);

module.exports = router;
