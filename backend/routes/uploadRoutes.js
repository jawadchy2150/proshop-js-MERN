import express from "express";
import path from "path";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // console.log("Original file name:", file.originalname);
    cb(
      null,
      `${path.basename(
        file.originalname,
        path.extname(file.originalname)
      )}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

/*If the uploaded file is photo.JPG, path.extname(file.originalname) returns .JPG.
.toLowerCase() converts it to .jpg.
filetypes.test('.jpg') checks if .jpg matches the regular expression /jpg|png|jpeg/, which it does. So extname will be true.
Both extname and mimetype are checking the file type, but they do so in different ways to provide an extra layer of validation.
User Manipulation:
A user can easily change a file's extension (e.g., renaming document.pdf to document.jpg). The extname check would think it's a valid image file based on the extension alone.
The mimetype check would catch this because the content type would still be application/pdf.
*/

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  });
});

export default router;
