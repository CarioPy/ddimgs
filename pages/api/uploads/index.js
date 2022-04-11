import nextConnect from "next-connect";
import multer from "multer";
import uploadObject from "./upload_DO";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("theFiles"));

apiRoute.post(async (req, res) => {
  console.log(req.files);
  // only upload 1 file for now. Try find out how to upload multiple files to DO.
  const { path, filename, mimetype } = req.files[0];
  await uploadObject(path, filename, mimetype);
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
