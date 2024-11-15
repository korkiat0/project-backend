const express = require("express");
const {
  createRepair,
  findRepairRequestByUserId,
  deleteRepairByUserId,
  editRepairByUserId,
  findRepairRequestByAdmin,
  editStatusByUserId,
} = require("../controllers/repair-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");

const repairRoute = express.Router();

repairRoute.post("/", authenticate, upload.single("image"), createRepair);
repairRoute.get("/history", authenticate, findRepairRequestByUserId);
repairRoute.get("/dashboard", authenticate, findRepairRequestByAdmin);
repairRoute.delete("/delete/:repairId", authenticate, deleteRepairByUserId);
repairRoute.patch("/editStatus", authenticate, editStatusByUserId);
repairRoute.patch(
  "/edit",
  authenticate,
  upload.single("image"),
  editRepairByUserId
);

module.exports = repairRoute;
