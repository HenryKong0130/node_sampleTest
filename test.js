const moment = require('moment')

//console.log(moment().toString());


//得到当前的时间戳，本地的当前时间和utc的当前时间相同
console.log(moment().valueOf(),+moment());
console.log(moment.utc().valueOf());


//根据指定的日期时间格式得到时间，时间格式：


const format = ['yyyy-mmmm-dd hh:mm:ss','y年m月d天 hh点mm分ss秒']
const q = moment.utc('2022-12-02 10:22:50',format,true)
console.log(q.format("y年m月d天 hh点mm分ss秒"));

