const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");

const carRoute = require("../routes/index");

const app = express();
const publicDir = path.resolve(__dirname, ".././public");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Mengatur folder statis untuk menyajikan file CSS, gambar, dan skrip
app.use(express.static(path.join(__dirname, "../views")));

// Mengatur tipe MIME untuk file CSS
app.use(
  "/bootstrap/css",
  express.static(path.join(__dirname, "/bootstrap/css/bootstrap.min.css"))
);

// Mengatur tipe MIME untuk file JS
app.use(
  "/bootstrap/js",
  express.static(path.join(__dirname, "/bootstrap/js/bootstrap.min.js"))
);

// Mengatur mesin template EJS dan folder views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(flash());
app.use(session({ secret: "Rizki", saveUninitialized: true, resave: true }));
app.use(express.static(publicDir));

// Menangani permintaan untuk halaman Landing Page
app.get("/", (req, res) => {
  res.render("landingPage");
});

// Menangani permintaan untuk halaman Pencarian Mobil
app.get("/client", (req, res) => {
  res.render("cariMobil");
});

app.use(carRoute);

module.exports = app;
