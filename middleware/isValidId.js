import isValidObjectId from "mongoose";

import HttpError from "../helpers/HttpError";

const isValidId = (req, res, next) => {
  const { id } = req.body;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `id ${id} is not valid`));
  }
  next();
};

export default isValidId;
