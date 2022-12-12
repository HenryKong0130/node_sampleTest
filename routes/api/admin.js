const express = require("express");
const router = express.Router();
const adminServ = require("../../services/adminService");
const { asyncHandler } = require("../getSendResult");
//const cryptor = require("../../util/crypt");
const jwt = require("../jwt");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result = await adminServ.login(req.body.loginId, req.body.loginPwd);
    if (result) {
      let value = result.id;
      jwt.publish(res, undefined, {
        id: value,
      });
    }
    return result;
  })
);

router.get(
  "/whoami",
  asyncHandler(async (req, res) => {
    console.log('我是谁');
    return await adminServ.getAdminById(req.userId)
  })
);

module.exports = router;
