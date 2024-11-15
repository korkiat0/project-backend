const prisma = require("../models/prisma");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");
module.exports.createRepair = async (req, res, next) => {
  console.log(req.body, "req.body");
  console.log(req.file, "req.file");
  try {
    if (!req.body.topic || !req.body.details || !req.file || !req.body.phone) {
      createError({
        message: " title or details or file or phone",
        statusCode: 400,
      });
    }
    const imageURL = await uploadService.upload(req.file.path);
    console.log(imageURL);

    const data = {
      roomId: +req.body.roomAt,
      userId: +req.user.id,
      title: req.body.topic,
      repairDeteil: req.body.details,
      phone: req.body.phoneNumber,
      repairPhoto: imageURL,
    };
    const result = await prisma.repairRequest.create({ data });
    console.log("error", result);
    res.status(201).json({ msg: " created" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.findRepairRequestByUserId = async (req, res, next) => {
  //req.user
  console.log(req.user.id);
  try {
    const userRepair = await prisma.repairRequest.findMany({
      where: {
        userId: req.user.id,
      },
      include: { room: true },
    });
    console.log(userRepair);
    res.status(200).json({ userRepair });
  } catch (err) {
    next(err);
  }
};
module.exports.findRepairRequestByAdmin = async (req, res, next) => {
  //req.user

  try {
    const userRepair = await prisma.repairRequest.findMany({
      include: {
        room: true,
      },
    });
    console.log(userRepair);
    res.status(200).json({ userRepair });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteRepairByUserId = async (req, res, next) => {
  //req.user
  console.log(req.params.repairId);
  try {
    const userRepair = await prisma.repairRequest.delete({
      where: {
        id: +req.params.repairId,
      },
    });
    console.log(userRepair);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
module.exports.editStatusByUserId = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = {
      status: req.body.status,
    };
    console.log(data);
    const result = await prisma.repairRequest.update({
      where: { id: +req.body.id },
      data,
    });
    console.log("error", result);
    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.editRepairByUserId = async (req, res, next) => {
  //req.user
  console.log(req.body);
  try {
    if (!req.body.topic && !req.body.details && !req.body.phone) {
      createError({
        message: " title or details  or phone",
        statusCode: 400,
      });
    }

    const data = {
      title: req.body.topic,
      repairDeteil: req.body.details,
      phone: req.body.phoneNumber,
    };
    if (req.file?.path) {
      const imageURL = await uploadService.upload(req.file.path);
      console.log(imageURL);
      data.repairPhoto = imageURL;
    }
    console.log(data);
    const result = await prisma.repairRequest.update({
      where: { id: +req.body.id },
      data,
    });
    console.log("error", result);
    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
