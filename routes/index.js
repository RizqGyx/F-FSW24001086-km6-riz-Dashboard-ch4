const router = require("express").Router();

const Car = require("./carRouter");
const CarAdmin = require("./carAdminRouter");

router.use("/api/v1/customers", Car);
router.use("/admin", CarAdmin);

module.exports = router;
