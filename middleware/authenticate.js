import jwt from "jsonwebtoken";
import "dotenv/config";
import HttpError from "../helpers/HttpErrors.js";
import User from "../models/User.js";

const { JWT_SECRET } = process.env;
const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401, error.message("not Bearer"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, error.message("not user"));
    }
    req.user = user;
    next();
  } catch {
    throw HttpError(401);
  }
};

export default authenticate;