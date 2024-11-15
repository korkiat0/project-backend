const unitsService = require("../services/unitService");

module.exports.getUnits = async (req, res, next) => {
  try {
    const units = await unitsService.findUnits();

    res.json({ units: units });
  } catch (err) {
    console.log(err);
  }
};
module.exports.getRoom = async (req, res, next) => {
  try {
    const room = await unitsService.findRoom(req.body);

    res.json({ room: room });
  } catch (err) {
    console.log(err);
  }
};
module.exports.getUserRoom = async (req, res, next) => {
  try {
    const room = await unitsService.findUserRoomById(req.user.id);

    res.json({ room: room });
  } catch (err) {
    console.log(err);
  }
};
