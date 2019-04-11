var express = require('express');    /* 重要： 不可少 */ 
var path = require('path');  /* 重要：目录设置时，可使用其方法引用根目录， 不可少 */
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* 声明要访问的路由(该路由指定路由文件--html/ejs/...)， 该路由可自定义 */
var index = require('./routes/index');
var users = require('./routes/users');/*看需要否*/

var app = express();  /* 重要： 不可少 */

//注释掉默认的，自己手动修改默认引擎
app.set('views', path.join(__dirname, 'views'));
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
// view engine setup
//app.set('views', path.join(__dirname, 'views')); //定义模板（views ）搜索路径，在根目录的 views 文件夹下,可自定义
//app.set('view engine', 'html');  //设置模板引擎 为： EJS, 可自定义html jade等

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//对post请求的请求体进行解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));  //指定静态文件名称是 public, 文件夹名可自定义

/* 访问已定义的路由文件 */
app.use('/', index);
app.use('/', users);

// 404 处理: catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理：error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index');
});


module.exports = app;  /* 抛出 app 变量方法， 为 bin/www 中端口设置进行“铺垫” */