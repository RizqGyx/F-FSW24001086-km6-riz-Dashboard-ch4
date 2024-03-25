const express = require("express");
const morgan = require("morgan");

const carRoute = require("../../routes/carRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/cars", carRoute);

module.exports = app;
