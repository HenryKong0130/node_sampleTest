//require("./models/relation");
//require("./mock/mockStudent");
//require("./spider/fetchBooks");

// const adminService = require("./services/adminService");
//const stuSer = require("./services/studentService");
// adminService.addAdmin({loginId:'Join',loginPwd:'123123'}).then((resp)=>{
//     console.log(resp);
// })

// stuSer.getStudents(2,1).then((r)=>{
//   const {name} = r.students[0]
//   console.log(name);
//   console.log(r);
// })

//require("./init");
// stuSer.getStudents(1,10,'孔').then((r)=>{
//   console.log(r)
// })

// stuSer
//   .addStudent({
//     name: "123",
//     birthday: "1004-04-23",
//     sex: true,
//     classId: 12,
//     a: 123,
//     b: "123sdlnfl",
//   })
//   .catch((err) => {
//     console.log(err);
//   });
require('./routes/init')

// const jwt = require("jsonwebtoken");
// const secret = "kff";

// const token = jwt.sign(
//   {
//     name: "henry",
//     id: 5,
//   },
//   secret,
//   {
//     expiresIn: 0,
//   }
// );

// try {
//     const decode = jwt.verify(token, secret);
//     console.log(decode);    
// } catch (error) {
//     console.log('jwt无效');
// }