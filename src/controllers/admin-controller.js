const hashService = require("../services/hash-Service");
const jwtService = require("../services/jwtServiec");
const userService = require("../services/userService");
const createError = require("../utils/create-error");

module.exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await userService.findUserByEmailAndIsAdmin(email);
    console.log(existUser);
    if (!existUser) {
      createError({
        message: "invalid credentials",

        statusCode: 400,
      });
    }
    if (existUser.isAdmin == 0) {
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
