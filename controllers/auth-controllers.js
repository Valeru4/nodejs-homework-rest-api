import User from "../models/User.js";

const signup = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    password: newUser.password,
  });
};

export default {
  signup,
};
