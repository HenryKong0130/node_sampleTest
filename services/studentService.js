
const Student = require("../models/Student");
const {Op} = require('sequelize');
const Class = require('../models/Class');
const validate = require("validate.js");
//const { type } = require("os");
const {pick} = require('../util/propertyHelper')
const moment = require('moment')

exports.addStudent = async function (stuObj) {

  stuObj = pick(stuObj,"name","birthday","sex","mobile","classId")
  console.log(stuObj);
  //验证的方式不够，自定义验证规则
  validate.validators.classExits = async function(value){
    const c = await Class.findByPk(value);
    if(c){
      return 
    }
    return 'is not exist'
  }
  const rule = {
    //验证规则
    name:{
      presence:{
        allowEmpty:false,
        message:'姓名填写错误啦'
      },
      type:"string",
      length:{
        minimum:2,
        maximum:4
      }
      
    },
    birthday:{
      presence:{
        allowEmpty:false
      },
      datetime:{
        dateOnly:true
      },
      
    },
    sex:{
      presence:{
        allowEmpty:false
      },
      type:"boolean"
    },
    classId:{
      presence:true,
      numericality:{
        strict:false,
        onlyInter:false
      },
      classExits:true
    }
  }
  //方式1
  //验证通过返回undefined；否则返回error info
  //const result = validate.async(stuObj,rule)
  //console.log(result);

  //方式2
  //验证通过，什么都不会返回，否则会报错
  await validate.async(stuObj,rule)

  //const ins = await Student.create(stuObj);
  //return ins.toJSON();
};

exports.deleteStudent = async function (id) {
  return await Student.destroy({
    where: {
      id,
    },
  });
};

exports.updateStudent = async function (id, obj) {
  return await Student.update(obj, {
    where: {
      id,
    },
  });
};

exports.getStudents = async function (page = 1, limit = 10, name) {
  // const results = await Student.findAll({
  //   offset: (page - 1) * limit,
  //   limit: +limit,
  // });
  // return JSON.stringify(results)
  const where = {}
  if(name){
    where.name = {
      [Op.like]:`${name}%`
    }
  }
  const results = await Student.findAndCountAll({
    //include: [Class],
    where,
    attributes:['name','age'],
    offset: (page - 1) * limit,
    limit: +limit,
  });
  return {
    count: results.count,
    students: JSON.parse(JSON.stringify(results.rows))
  }
};

exports.getStudentById = async function (id) {
  const result = await Student.findByPk(id);
  if (result) {
    return result.toJSON();
  }
  return null;
};