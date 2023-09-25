import express from "express";

import { userSchemas } from "../../models/User.js";

import validateBody from "../../middleware/validateBody.js";
import AuthControllers from "../../controllers/auth-controllers.js";
import authenticate from "../../middleware/authenticate.js";

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.signUpSchema);

const userSigninValidate = validateBody(userSchemas.signInSchema);

authRouter.post("/users/register", userSignupValidate, AuthControllers.signup);
authRouter.post("/users/login", userSigninValidate, AuthControllers.signin);
authRouter.get("/current", authenticate, AuthControllers.getCurrent);
authRouter.post("/users/signout", authenticate, AuthControllers.signout);
export default authRouter;
