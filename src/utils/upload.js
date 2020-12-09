import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { changeFileNameToUpload } from "./utils";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "waaw-photo-bucket/photos",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = changeFileNameToUpload(file.originalname);
      cb(null, fileName);
    },
  }),
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { key },
  } = req;

  res.json({ key });
};
