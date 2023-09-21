import express from "express";

import { userSchemas } from "../../models/User.js";

import validateBody from "../../middleware/validateBody.js";
import AuthControllers from "../../controllers/auth-controllers.js";

const authRouter = express.Router();

console.log(userSchemas.signUpSchemas);

const userSignupValidate = validateBody(userSchemas.signUpSchema);

console.log(userSignupValidate);

authRouter.post("/users/register", userSignupValidate, AuthControllers.signup);
export default authRouter;
