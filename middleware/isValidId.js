import isValidObjectId from "mongoose";
import HttpError from "../helpers/HttpErrors.js";

const isValidid = (req, res, next) => {
  const { id } = req.body;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `id ${id} is not valid`));
  }
  next();
};

export default isValidid;
