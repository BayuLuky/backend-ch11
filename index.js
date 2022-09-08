const express = require("express");
const cors = require("cors");
const router = require("./routes");
const passport = require("./lib/passport");
const app = express();
const swaggerJSON = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'https://frontend-binarch11.herokuapp.com');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(passport.initialize());
app.use("/api", router);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/api`);
});
