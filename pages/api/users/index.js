import DBConnect from "../../../utils/dbConnect";
import User from "/models/user.js";
import bcrypt from "bcrypt";

DBConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email: req.body.email });
        console.log(req.body.password);
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          res.status(201).json({ success: true, data: user });
        } else {
          res.status(400).json({ success: false });
          console.log("1");
        }
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
