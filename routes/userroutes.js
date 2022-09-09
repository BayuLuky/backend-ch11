const userController = require("../controllers/api/UserController");
const router = require("express").Router();
const restrict = require("../middlewares/restrict");

/**
 * @Routes "/api/users"
 */

router.all("/:id", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );  
    res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
    next();
});

router.get("/score", userController.getUserScores);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserDetail);
router.put("/:id", restrict, userController.updateUser);
router.put("/img/:id", restrict, userController.updateImageUser);

module.exports = router;
