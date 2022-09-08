const router = require("express").Router();
const authController = require("../controllers/api/AuthController");
const restrict = require("../middlewares/restrict");
router.all("/register", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://frontend-binarch11.herokuapp.com");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization"
  );
  next();
});

router.all("/login", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://frontend-binarch11.herokuapp.com");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization"
  );
  next();
});
router.get("/", authController.index);
router.post("/register", authController.register);
router.post("/login", authController.login);



router.get("/login", restrict, (req, res) => {
  console.log(req.headers);
  res.status(201).json({
    fullname: req.user.dataValues.fullname,
    authorized: true,
  });
});

module.exports = router;
