const { getErr } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp");
//const cryptor = require("../util/crypt");
const jwt = require("./jwt");
const needTokenApi = [
  { method: "POST", path: "/api/student/" },
  { method: "PUT", path: "/api/student/:id" },
  { method: "GET", path: "/api/admin/whoami" },
];

//console.log(reg);
//用于解析token,即cookie或者header中的token
module.exports = (req, res, next) => {
  //判断请求是否需要token
  const apis = needTokenApi.filter((api) => {
    const reg = pathToRegexp(api.path);
    return api.method === req.method && reg.test(req.path);
  });
  if (apis.length === 0) {
    next();
    return;
  }
  // const token = req.cookies;
  // if (!token) {
  //   //从hearder中获取
  //   token = req.headers.authorization;
  // }
  // if (!token) {
  //   //没有认证
  //   console.log("验证没有通过");
  //   handleNonToken(req, res, next);
  //   return;
  // }
  // //验证token
  // const userId = cryptor.decrypt(token);
  // req.userId = userId;
  // console.log("认证通过");
  // next();
  const result = jwt.verify(req);
  if (result) {
    //认证通过
    req.userId = result.id;
    next();
  } else {
    //认证失败
    handleNonToken(req, res, next);
  }
};

function handleNonToken(req, res, next) {
  res
    .status(403)
    .send(getErr("you dont have any token to access the api", 403));
}
