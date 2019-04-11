var express = require('express');
/*const申明常量.不可变的,不可重新申明不可赋值
 */
const app = express();
const path = require('path');
/*multer文件上传组件模块*/
const multer = require('multer');
/*解析器*/
const bodyParser = require('body-parser');
/*设置路径  https://www.npmjs.com/package/multer*/
const upload = multer({dest: 'public/upload/'});
/*引入删除文件中间件fs模块*/
var fs = require("fs");
 
var router = express.Router();
//引入数据库包
var db = require("./db.js");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
  
/**

 * 查询列表页
 *文件上传模块
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源处理

app.get('/new_file', function(req, res) {
  res.sendFile(path.join(__dirname, 'new_file.html'));
});

app.post('/user', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

/*单文件上传*/
router.post('/file_upload', upload.single('file'), function(req, res) { // 单张图片上传
	var img=req.file.filename;
	var originalname=req.file.originalname;
	console.log(img+originalname);
	db.query("insert into img(img,originalname) values('"+img+"','"+originalname+"')", function (err, rows) {
        if (err) {
            res.send('新增失败：' + err);
        } else {
            res.send(img);
        }
    });
});
/*多文件上传*/
router.post('/files_upload', upload.array('files', 3), function(req, res) { // 多张图片上传
	console.log(req.files.filename);
	return res.send(req.files);
	for (var i=0;i<req.files.length;i++) {
		return console.log(req.files.items.filename);
	}
	db.query("insert into img(img,originalname) values('"+img+"','"+originalname+"')", function (err, rows) {
        if (err) {
            res.send('新增失败:'+ err);
        } else {
            res.send('新增成功:恭喜你'+rows);
        }
    })
})
/*
 * 文章提交
 */

router.post('/users/add',function (req, res) {
    var article = req.body.article;
    var titles = req.body.titles;
    var Category = req.body.Category;
    var insert=`insert into boke (article,titles,Category) values ("${article}","${titles}","${Category}")`;
    console.log(insert);
     db.query(insert, function (err, rows) {
        if (err) {
            res.send('新增失败：' + err);
        } else {
            res.send('新增成功:恭喜你');
        }
    })
});


/**
 * 删
 */
router.get('/del/:id', function (req, res) {
	
    var id = req.params.id;
    var name = req.body.name;
    var name = "req.body.name";
    db.query("delete from uname where id=" +id, function (err, rows) {
        if (err) {
            res.end('删除失败：' + err)
        } else {
            res.redirect('/users')
        }
    });
});
/**
 * 修改
 */
router.get('/toUpdate/:id', function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    db.query("select * from uname where id=" + id, function (err, rows) {
        if (err) {
            res.end('修改页面跳转失败：' + err);
        } else {
            res.render("update", {datas: rows});       //直接跳转
        }
    });
});
router.post('/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    db.query("update uname set name='" + name + "',age='" + age + "' where id=" + id, function (err, rows) {
        if (err) {
            res.end('修改失败：' + err);
        } else {
            res.redirect('/users');
        }
    });
});
/**
 * 查询
 */
/*
 * 个人日记查询
 */

router.post('/users/search',function (req, res) {
     db.query("SELECT * FROM `boke` WHERE Category='0'", function (err, rows) {
        if (err) {
            res.send('查詢失败：' + err);
        } else {
            res.send(rows);
        }
    })
});

/*
 * 学习笔记查询
 */

router.post('/users/search_study',function (req, res) {
     db.query("SELECT * FROM `boke` WHERE Category='1'", function (err, rows) {
        if (err) {
            res.send('查詢失败：' + err);
        } else {
            res.send(rows);
        }
    })
});

/*
 * 技术文章查询
 */

router.post('/users/search_skill',function (req, res) {
     db.query("SELECT * FROM `boke` WHERE Category='2'", function (err, rows) {
        if (err) {
            res.send('查詢失败：' + err);
        } else {
            res.send(rows);
        }
    })
});


/*图片预览查询*/

router.post('/users/search_images',function (req, res) {
     db.query("SELECT img FROM `img`", function (err, rows) {
        if (err) {
            res.send('查詢失败：' + err);
        } else {
            res.send(rows);
        }
    })
});

/*已存在图片删除*/
/*
 *、 fs.stat && fs.statSync 提供了访问文件的属性信息
2、 fs.readdir && fs.readdirSync 提供读取文件目录信息
3、 fs.unlink && unlinkSync  进行删除文件操作，不可以删除文件夹
4、 fs.rmdir && fs.rmdirSync 进行删除文件夹操作，但文件夹必须为空文件夹
 
 * */
router.post('/upload/del', function (req, res) {
	var name= req.body.src;
	console.log(req.body);
	console.log(name);
	var upload=__dirname.replace('routes','public')+'/upload/'+name;
	console.log(upoload);
	fs.unlink(upload,function(err) {
		console.log(__dirname);
   if (err) {
return console.log(err);
   }
   console.log("文件删除成功！");
});
var sql = "DELETE FROM img";
if (name) {
        sql += " and img='" +name + "' ";
    }
sql = sql.replace("and","where");
 	db.query(sql, function (err, rows) {
// db.query("DELETE FROM `img` WHERE img="+name, function (err, rows) {
        if (err){
            res.send('查詢失败：' + err);
        } else {
            res.send(rows);
        }
    })
})
/*router.post('/search', function (req, res) {
//  var name = req.body.s_name;
//  var age = req.body.s_age;
//
//  var sql = "select * from img";
//
//  if (name) {
//      sql += " and name='" +name + "' ";
//  }
//
//  if (age) {
//      sql += " and age='" + age + "' ";
//  }
//  sql = sql.replace("and","where");
    sql="select * form img"
    db.query(sql, function (err, rows) {
        if (err) {
            res.end("查询失败：", err)
        } else {
        	res.end("查询成功：", err)
        	res.render("users", {title: 'Express','img': img, 'originalname': originalname});
//          res.render("users", {title: 'Express', datas: rows, s_name: name, s_age: age});
        }
    });
    
});*/
module.exports = router;