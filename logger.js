const log4js = require("log4js");
const path = require("path");

log4js.configure({
  appenders: {
    sql: {
      type: "dateFile",
      filename: path.resolve(__dirname, "logs", "sql", "logging.log"),
      maxLogSize: 1024 * 1024, //配置文件的最大字节数
      keepFileExt:true,//保留日志的后缀名
      numBackups:2, //保留的日志量
      layout: {
        type: "pattern",
        pattern: "日志记录: %c %p [%d{yyyy-mm-dd:hh.mm.ss}]: %m%n",
      },
    },
    default: {
      type: "stdout",
    },
  },
  categories: {
    sql: {
      appenders: ["sql"], //该分类使用出口sql的配置写入日志
      level: "info",
    },
    default: {
      appenders: ["default"],
      level: "all",
    },
  },
});

process.on("exit", () => {
  log4js.shutdown();
});


const sqlLogger = log4js.getLogger("sql");
const defaultLogger = log4js.getLogger() //不指定出口文件，那就是往default文件里写

exports.sqlLogger = sqlLogger;
exports.logger = defaultLogger