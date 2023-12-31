var express = require('express') //引入express模块
var router = express.Router()
var mysql = require('mysql') //引入mysql模块
var db_config = require('../config/db')
var app = express() //创建express的实例

router.get('/', (req, res) => {
  var connection = mysql.createConnection(db_config)
  connection.connect()

  var Sql = `SELECT orderlist.userName,orderlist.id, orderlist.reciver,orderlist.number,orderlist.createdTime, orderlist.userAddress ,orderlist.userAddressDetails ,
    orderlist.userPhone,commoditylist.name ,commoditylist.price,commoditylist.introduction,commoditylist.img FROM orderList 
     INNER JOIN commodityList ON orderList.id = commodityList.id` //WHERE userName = '${req.query.userName}'
  connection.query(Sql, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result)
  })
  connection.end()
})
module.exports = router
