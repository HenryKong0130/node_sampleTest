// 简单请求

//const { login } = require("../../services/adminService");

// fetch("http://localhost:5008/api/student")
//   .then((resp) => resp.json())
//   .then((resp) => {
//     console.log(resp);
//   });

// 预检请求
// fetch("http://localhost:5008/api/student", {
//   method: "POST",
//   headers: {
//     "content-type": "application/json",
//     a: 1,
//   },
//   //credentials: "include",
// })
//   .then((resp) => resp.json())
//   .then((resp) => {
//     console.log(resp);
//   });

//const login = document.querySelector('#login');
login.onclick = function () { 
    fetch("/api/admin/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        loginId: "Mark",
        loginPwd: "123456",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
      });
  };
