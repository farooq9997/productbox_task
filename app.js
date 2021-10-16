const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
  origin: "http://localhost:8081"
};
const db = require("./models");
indexRoute = require('./routes/index');
db.sequelize.sync();
app.use(cors(corsOptions));


// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to home page." });
// });
app.use(indexRoute);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});