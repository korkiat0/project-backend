const express = require("express");
const { adminLogin } = require("../controllers/admin-controller");

const adminRoute = express.Router();

adminRoute.post("/login", adminLogin);

module.exports = adminRoute;
