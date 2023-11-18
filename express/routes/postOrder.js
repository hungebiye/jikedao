var express = require('express') //引入express模块
var router = express.Router()
var mysql = require('mysql') //引入mysql模块
var db_config = require('../config/db')
var app = express() //创建express的实例

router.post('/', (req, res) => {
  res.send('sss')
  const sql = 'insert into orderlist(userName,reciver,userAddress,userAddressDetails,userPhone,id,number,createdTime) values (?,?,?,?,?,?,?,?)' //SQL语句.
  var connection = mysql.createConnection(db_config)
  connection.connect()
  let sqlParams = [
    req.body.userName,
    req.body.reciver,
    req.body.userAddress,
    req.body.userAddressDetails,
    req.body.userPhone,
    req.body.id,
    req.body.number,
    req.body.createdTime
  ]
  connection.query(sql, sqlParams, (err, result) => {
    if (err) {
      console.log(err)
      console.log(result)
    }
    console.log('订单' + req.body.userAddress + '----添加成功')
    // console.log(result); // 打印添加结果
  })

  connection.end()
})
module.exports = router
