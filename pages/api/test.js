import DBConnect from "../../utils/dbConnect";

DBConnect();

export default async (req, res) => {
  res.status(200).json({ test: "test" });
};
