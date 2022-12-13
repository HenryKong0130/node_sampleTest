const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jimp = require("jimp");

async function mark(
  waterPath,
  originPath,
  newPath,
  proportion,
  marginProportion
) {
  const [water, origin] = await Promise.all([
    jimp.read(waterPath),
    jimp.read(originPath),
  ]);

  //对水印图片进行修改
  const curProportion = origin.bitmap.width / water.bitmap.width;
  water.scale(curProportion / proportion);

  //计算位置
  const right = origin.bitmap.width * marginProportion;
  const bottom = origin.bitmap.height * marginProportion;
  const x = origin.bitmap.width - right - water.bitmap.width;
  const y = origin.bitmap.height - bottom - water.bitmap.height;

  //写入水印
  origin.composite(water, x, y, {
    mode: jimp.BLEND_MULTIPLY,
    opacitySource: 0.5,
    opacityDest: 0.7,
  });

  await origin.write(newPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/origin"));
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
    //fileSize: 100000 * 1024,
  },
});

const waterPath = path.resolve(__dirname, "../../public/img/water.jpg");
router.post("/", upload.single("img"),async  (req, res) => {
  const name = req.file.filename;
  const url = `/upload/${name}`;
  const newPath = path.resolve(__dirname, "../../public/upload");

  console.log(req.file);
  //调用mark方法来添加水印
  await mark(waterPath,req.file.path,newPath)
  res.send({
    code: 0,
    msg: "",
    data: url,
  });
});

module.exports = router;
