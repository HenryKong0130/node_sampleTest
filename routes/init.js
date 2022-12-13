const express = require("express");
const app = express();
const path = require("path");
const staticPath = path.resolve(__dirname, "../public");
const cors = require("cors");

/**
 * 当请求时，会根据请求路径，从指定的目录中寻找是否存在该文件。
 * 如果存在，直接响应文件的内容，而不再移交给后续的中间件
 * 如果不存在文件，则直接移交给后续的中间件处理
 * 默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件
 */
app.use(express.static(staticPath));

//解决跨域的中间件
const whiteList = ["null", "http://localhost:5008"];
app.use(
  cors({
    origin(origin, callback) {
      if(!origin){
        callback(null,"*")
        return
      }
      if (whiteList.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("not allowed"));
      }
    },
    credentials: true,
  })
);
//加入cookie-parser中间件
//加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie
//加入之后，会在res对象中注入cookie方法，用于设置cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());
//应用自己手写的解析token中间件
app.use(require("./tokenMiddleware"));

//解析 appliction/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));
//解析 application/json 格式的请求体
app.use(express.json());

//处理api的请求
app.use("/api/student", require("./api/student"));
// app.use("/api/book", require("./api/book"));
// app.use("/api/class", require("./api/class"));
app.use("/api/admin", require("./api/admin"));

//处理文件上传和下载的中间件
app.use("/api/upload", require("./api/upload"));
app.use("/res", require("./api/download"));




// 处理错误的中间件
app.use(require("./errorMiddleware"));

const port = 5009;
app.listen(port, () => {
  console.log(`正在监听${port}`);
});
