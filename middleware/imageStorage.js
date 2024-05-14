import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Math.round(Math.random() * 1E9) + "-" + file.originalname); //
  },
});

export const upload = multer({ storage: imageStorage }).array("images", 10); // Field name and max
