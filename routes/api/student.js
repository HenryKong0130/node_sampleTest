const express = require("express");
//const { connectLogger } = require("log4js");
const router = express.Router();
const stuSer = require("../../services/studentService");
const sendMsg = require("../getSendResult");

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sex = req.query.sex || -1;
  const name = req.query.name || "";
  const result = await stuSer.getStudents(page, limit, sex, name);
  res.send(sendMsg.getResult(result));
});

router.get("/:id", async (req, res) => {
  const result = await stuSer.getStudentById(req.params.id);
  res.send(sendMsg.getResult(result));
});

router.post("/", async (req, res, next) => {
  try {
    const result = await stuSer.addStudent(req.body);
    res.send(sendMsg.getResult(result));
  } catch (err) {
    //console.log(err);
    next(err);
  }
});

router.put("/:id", async (req, res) => {
  const result = await stuSer.updateStudent(req.params.id,req.body);
  res.send(sendMsg.getResult(result))
});

router.delete("/:id", async (req, res) => {
  const result = await stuSer.deleteStudent(req.params.id);
  res.send(sendMsg.getResult(result));
});

module.exports = router;
