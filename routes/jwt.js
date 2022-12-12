const secret = "kff";
const cookieKey = "token";
const jwt = require("jsonwebtoken");

exports.publish = function (res, maxAge = 3600 * 24, info = {}) {
  const token = jwt.sign(info, secret, {
    expiresIn: maxAge,
  });
  //将创建的jwt添加到cookie返回给用户
  res.cookie(cookieKey, token, {
    maxAge: maxAge * 1000,
    path: "/",
  });
  //添加其他传输
  res.header("authorization", token);
};

exports.verify = function (req) {
  let token = "";
  //尝试从cookie中获取
  //console.log(req.cookies[cookieKey]);
  token = req.cookies[cookieKey];
  //console.log(token);
  //cookies中没有
  if (!token) {
    //尝试从header中获取
    token = req.headers.authorization;
    //如果没有，则返回null
    if (!token) {
      return null;
    }
    //authorization: bearer token
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];
  }
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (error) {
    return null;
  }
};
