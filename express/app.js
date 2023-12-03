var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const fs = require('fs')
var usersRouter = require('./routes/users')
var postRouter = require('./routes/post')
var avatar = require('./routes/avatar')
var addressRoute = require('./routes/address')
var postAddressRoute = require('./routes/postAddress')
var deleteRouter = require('./routes/deleteSql')
var orderListRoute = require('./routes/orderList')
var postOrder = require('./routes/postOrder')
var index = require('./routes/index')
var app = express()

app.use('/index', index)

app.all('*', function (req, res, next) {
  //其中*表示允许所有域可跨
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
const bodyParser = require('body-parser')

// 使用中间件
// 对body-parser进行配置
app.use(bodyParser.json({limit: '50mb', extended: true})); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// 日志
app.use(logger('dev'))
// json格式解析
app.use(express.json())
// url加密
app.use(express.urlencoded({ extended: false }))
// cookie解析
app.use(cookieParser())
// 加载public文件夹中的静态资源
app.use(express.static(path.join(__dirname, 'public')))

// 获取 用户信息
app.use('/users', usersRouter)
// 获取所有用户地址
app.use('/address', addressRoute)
// 获取所有订单数据
app.use('/orderList', orderListRoute)
// 接收post传递数据，存入mysql
app.use('/post', postRouter)
// 接收 头像数据
app.use('/avatar', avatar)
// 接收 用户新创地址数据
app.use('/postAddress', postAddressRoute)
// 删除用户
app.use('/deleteSql', deleteRouter)
// 提交订单
app.use('/postOrder', postOrder)

app.get('/', (req, res) => {
  res.send('nothing')
})
app.get('/err', () => {
  throw new Error('not find')
})
app.get('/notFind', (req, res) => {
  res.sendStatus(404, 'application/json', '{"error":"resource notsss found"}')
})
app.get('/file-does-not-exist', function (req, res, next) {
  fs.readFile('./file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})

//路由要放在error上面
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(8000, () => {
  console.log('port 8000 start-----')
})
module.exports = app
