const prisma = require("../models/prisma");

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });
userService.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email: email,
    },
  });
userService.findUserByEmailAndIsAdmin = (email, isAdmin) =>
  prisma.user.findFirst({
    where: {
      email: email,
      isAdmin: isAdmin,
    },
  });
userService.findUserById = (id) => prisma.user.findUnique({ where: { id } });
userService.findUserByPhone = (phone) =>
  prisma.user.findFirst({
    where: {
      phone: phone,
    },
  });
//where
// userService.addUnitsByUser = (data) => prisma.room.create({ where:{

// } });

module.exports = userService;
