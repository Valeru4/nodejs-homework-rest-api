import express from "express";

import { userSchemas } from "../../models/User.js";

import validateBody from "../../middleware/validateBody.js";
import AuthControllers from "../../controllers/auth-controllers.js";
import authenticate from "../../middleware/authenticate.js";
import upload from "../../middleware/upload.js";

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.signUpSchema);

const userSigninValidate = validateBody(userSchemas.signInSchema);
const userEmailValidate = validateBody(userSchemas.userEmailSchema);

authRouter.post("/users/register", userSignupValidate, AuthControllers.signup);
authRouter.post("/users/login", userSigninValidate, AuthControllers.signin);
authRouter.get("/current", authenticate, AuthControllers.getCurrent);
authRouter.post("/users/signout", authenticate, AuthControllers.signout);
authRouter.get("/users/verify/:verificationToken", authControler.verify);
authRouter.post(
  "/users/verify",
  userEmailValidate,
  authControler.resendVerifyEmail
);
authRouter.patch(
  "/users/avatars",
  upload.single("avatar"),
  authenticate,
  AuthControllers.updateAvatar
);

export default authRouter;
