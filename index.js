const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");
require("dotenv").config();
require("./config/dbconnection");

app.use(cors());
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

const User = require("./models/User");
const Booking = require("./models/Booking");
const Car = require("./models/Car");

app.use("/api/v1/cars", require("./routes/api/v1/carRouter"));
app.use("/api/v1/auth", require("./routes/api/v1/userRouter"));
app.use("/api/v1/booking", require("./routes/api/v1/bookingRouter"));

app.get("*", (req, res) => {
  res.render("notfound");
});

app.listen(process.env.PORT, err => {
  if (err) {
    console.log("Error in running server");
    return;
  }
  console.log(
    `Server is up and running on http://localhost:${process.env.PORT}`
  );
});
