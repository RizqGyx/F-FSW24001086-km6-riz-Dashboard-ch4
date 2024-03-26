const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");

const carRoute = require("../../routes/carRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(morgan("dev"));

// Mengatur folder statis untuk menyajikan file CSS, gambar, dan skrip
app.use(express.static(path.join(__dirname, "../../views")));

// Mengatur tipe MIME untuk file CSS
app.get("/bootstrap/css/bootstrap.min.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../bootstrap/css/bootstrap.min.css"), {
    headers: {
      "Content-Type": "text/css",
    },
  });
});

app.get("/bootstrap/js/bootstrap.min.js", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../bootstrap/js/bootstrap.min.js"),
    {
      headers: {
        "Content-Type": "text/javascript",
      },
    },
    (err) => {
      if (err) {
        console.error(err);
        res.status(404).end();
      }
    }
  );
});

// Mengatur mesin template EJS dan folder views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../views"));

app.get("/", (req, res) => {
  res.render("cars");
});

app.use("/cars", carRoute);

module.exports = app;
