const jwtService = require("../services/jwtServiec");
const userService = require("../services/userService");
const createError = require("../utils/create-error");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError({
        message: "unauthenticated",
        statusCode: 401,
      });
    }
// "Bearer aaaaaaaa"
    const accessToken = authorization.split(" ")[1]; //["Bearer","aaa"]
    const payload = jwtService.verify(accessToken);

    const user = await userService.findUserById(payload.id);
    if (!user) {
      createError({
        message: "user was not found",
        statusCode: 400,
      });
    }

    delete user.password;

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
