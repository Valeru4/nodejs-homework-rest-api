import express from "express";

import * as userSchema from "../../models/User.js";

import validateBody from "../../middleware/validateBody.js";
import AuthControllers from "../../controllers/auth-controllers.js";

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchema.SignupSchema);

console.log(userSignupValidate);

authRouter.post("/users/register", userSignupValidate, AuthControllers.signup);
export default authRouter;
