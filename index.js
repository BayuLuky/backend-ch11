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

app.use(passport.initialize());
app.use("/api", router);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/api`);
});
