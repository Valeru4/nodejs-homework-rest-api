import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import gravatar from "gravatar";
import jimp from "jimp";

const { JWT_SECRET } = process.env;
import HttpError from "../helpers/HttpErrors.js";

const postersPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is invalid");
  }

  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is invalid");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: "" });

  res.json({
    message: "Signout success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;

  const image = await jimp.read(oldPath);
  await image.resize(200, 200);
  await image.writeAsync(oldPath);
  const newPath = path.join(postersPath, filename);
  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  if (!avatarURL) throw HttpError(404, "Not found");

  res.json({ avatarURL });
};

export default {
  signup,
  signin,
  getCurrent,
  signout,
  updateAvatar,
};
