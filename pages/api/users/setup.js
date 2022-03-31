import DBConnect from "../../../utils/dbConnect";
import User from "/models/user.js";
import bcrypt from "bcrypt";

DBConnect();

const saltRounds = 10;

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const user = await User.findOne({ email: process.env.email });
        if (!user) {
          const hash = await bcrypt.hash(process.env.password, saltRounds);
          await User.create({
            email: process.env.email,
            password: hash,
          });
        }
        console.log(user);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
