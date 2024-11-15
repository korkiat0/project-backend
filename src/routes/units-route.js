const express = require("express");
const {
  getUnits,
  getRoom,
  getUserRoom,
} = require("../controllers/units-controller");
const authenticate = require("../middlewares/authenticate");

const unitsRoute = express.Router();

unitsRoute.get("/building", getUnits);
unitsRoute.get("/room", getRoom);
unitsRoute.get("/userRoom", authenticate, getUserRoom);

module.exports = unitsRoute;
