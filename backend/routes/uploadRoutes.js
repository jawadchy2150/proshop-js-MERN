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

function checkFileType(file, cb) {
  const filetypes = /jpg|png|jpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
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

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  // console.log("File uploaded:", req.file); // Debugging line
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path.replace(/\\/g, "/")}`,
  });
});

export default router;
