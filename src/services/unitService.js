const prisma = require("../models/prisma");

const unitsService = {};

unitsService.findUnits = (data) => prisma.building.findMany({});

unitsService.findRoom = (data) =>
  prisma.room.findMany({
    where: {
      buildingId: data.buildingId,
    },
  });

unitsService.updateRoom = (roomIndexId, userId) =>
  prisma.room.update({
    where: {
      id: roomIndexId,
    },
    data: {
      userId: userId,
    },
  });

unitsService.findRoomUser = (roomIndexId) =>
  prisma.room.findMany({
    where: {
      id: roomIndexId,
    },
  });
unitsService.findUserRoomById = (userId) =>
  prisma.room.findMany({
    where: {
      userId: userId,
    },
  });
module.exports = unitsService;
