const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/upload"));
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const randomstr = Math.random().toString(36).split(-6);
    const ext = path.extname(file.originalname);
    const filename = `${timestamp}-${randomstr}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000 * 1024,
  },
});
router.post("/", upload.single("img"), (req, res) => {
  const name = req.file.filename;
  const url = `/upload/${name}`;
  res.send({
    code: 0,
    msg: "",
    data: url,
  });
});

module.exports = router;
