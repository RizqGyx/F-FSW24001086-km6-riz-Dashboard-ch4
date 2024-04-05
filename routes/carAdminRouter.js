const router = require("express").Router();
const carAdminController = require("../controllers/carAdminController");
const upload = require("../middleware/uploader");

// Route for the dashboard home
router.get("/", carAdminController.carPage);

// Route for creating a new car data
router.get("/create", carAdminController.createCarPage);
router.post(
  "/admin/create",
  upload.single("photo"),
  carAdminController.createCar
);

// Route for updating a car data
router.get("/edit/:id", carAdminController.editCarPage);
router.post("/admin/edit/:id", carAdminController.editCar);

// Route for deleting a car data
router.post("/admin/delete/:id", carAdminController.deleteCar);

module.exports = router;
