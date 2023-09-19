import express from "express";

import User from "../../models/User.js";

import validateBody from "../../middleware/validateBody.js";
import AuthControllers from "../../controllers/auth-controllers.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(User.signUpSchema),
  AuthControllers.signup
);

export default authRouter;
