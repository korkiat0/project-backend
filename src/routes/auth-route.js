const express = require("express");
const { registerValidator } = require("../middlewares/validator");
const {
  authRegister,
  authLogin,
  getMe,
} = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");

const authRouter = express.Router();

authRouter.post("/register", authRegister);
authRouter.post("/login", authLogin);
authRouter.get("/me", authenticate, getMe);

module.exports = authRouter;
