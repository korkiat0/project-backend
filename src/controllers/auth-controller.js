const unitsService = require("../services/unitService");
const userService = require("../services/userService");
const hashService = require("../services/hash-Service");
const createError = require("../utils/create-error");
const jwtService = require("../services/jwtServiec");

module.exports.authRegister = async (req, res, next) => {
  try {
    delete req.body.confirmPassword;
    console.log(req.body);
    const data = req.body;
    data.password = await hashService.hash(req.body.password);
    const existUserByEmail = await userService.findUserByEmail(data.email);
    const existUserByPhone = await userService.findUserByPhone(data.phone);

    // const isUpdate = await unitsService.updateRoom(roomId, existUser.id);
    if (existUserByEmail) {
      createError({
        message: "email already in use",
        field: "email",
        statusCode: 400,
      });
    }

    if (existUserByPhone) {
      createError({
        message: "phone already in use",
        field: "phone",
        statusCode: 400,
      });
    }

    const user = await userService.createUser(data);
    console.log(user);
    res.status(201).json({ message: "user created" });
  } catch (err) {
    next(err);
  }
};

module.exports.authLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await userService.findUserByEmail(email);

    if (!existUser) {
      createError({
        message: "invalid credentials",

        statusCode: 400,
      });
    }
    if (existUser.isAdmin == 1) {
      createError({
        message: "invalid credentials",
        statusCode: 400,
      });
    }
    const isMatch = await hashService.compare(password, existUser.password);

    if (!isMatch) {
      createError({
        message: "invalid credentials",
        statusCode: 400,
      });
    }
    const accessToken = jwtService.sign({ id: existUser.id });

    res.status(201).json({ accessToken });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
