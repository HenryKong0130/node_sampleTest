const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:filename", (req, res) => {
  console.log("123");
  const absPath = path.resolve(
    __dirname,
    "../../resources",
    req.params.filename
  );
  console.log("333");
  res.download(absPath, req.params.filename, (err) => {
    console.log(err);
  });
});

module.exports = router;
