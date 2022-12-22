import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const userController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.send("User already exists!");
      }
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await new User({
        username: username,
        password: hashedPassword,
      });

      await newUser.save();
      return res.send(newUser);
    } catch (err) {
      return res.send(err);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.send("Invalid Credentials!");
      }
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.send("Invalid Credentials!");
      }
      return res.send(user);
    } catch (err) {
      // console.log(err);
      return res.send(err);
    }
  },
};

export default userController;
