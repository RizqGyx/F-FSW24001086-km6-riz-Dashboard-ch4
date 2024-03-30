const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const multer = require("multer");

const carRoute = require("../routes/index");
const { fileStore, fileFilter } = require("../utils/fileImageValidation");

const app = express();
const publicDir = path.resolve(__dirname, "../public");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Mengatur folder statis untuk menyajikan file CSS, gambar, dan skrip
app.use(express.static(path.join(__dirname, "../views")));

// Mengatur File Image Upload
app.use(multer({ storage: fileStore, fileFilter: fileFilter }).single("image"));

// Mengatur tipe MIME untuk file CSS
app.get("/bootstrap/css/bootstrap.min.css", (req, res) => {
  res.sendFile(path.join(__dirname, "./bootstrap/css/bootstrap.min.css"), {
    headers: {
      "Content-Type": "text/css",
    },
  });
});

app.get("/bootstrap/js/bootstrap.min.js", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./bootstrap/js/bootstrap.min.js"),
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
app.set("views", path.join(__dirname, "../views"));

app.use(flash());
app.use(session({ secret: "Rizki", saveUninitialized: true, resave: true }));
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("cars");
});

app.use(carRoute);

module.exports = app;
