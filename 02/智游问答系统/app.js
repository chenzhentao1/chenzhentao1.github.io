// express 
// body-parser
// cookie-parser
// fs
// multer
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var cookieParser = require("cookie-parser");
var app = express();
app.use(express.static("www"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
//***************************注册接口***********************
app.post("/register", function(req, res) {
    //	1.判断有没users这个文件夹，有判断有没（比如注册的用户名叫：张三）
    //		users这个文件夹下有没"张三.txt"文件，有
    //			用户存在，请重新注册
    //			没有，把张三的信息保存在users文件夹下的"张三.txt"文件

    //	没有users这个文件夹
    //		创建users这个文件夹
    //			创建成功：把张三的信息保存在users文件夹下的"张三.txt"文件
    //			创建失败 ：给响应创建users文件夹失败
    var fileName = "users/" + req.body.user + ".txt";
    fs.exists("users", function(exists) {
        if (exists) {
            //			有
            fs.exists(fileName, function(exists2) {
                if (exists2) {
                    //					用户存在
                    res.status(200).json({
                        info: "用户已存在",
                        code: 1
                    });
                } else {
                    //					用户不存在
                    //					写入文件
                    writeFile();
                }
            });

        } else {
            //			不存在users文件夹
            fs.mkdir("users", function(err) {

                if (err) {
                    res.status(200).json({
                        info: "创建users文件夹失败，系统错误",
                        code: 2
                    });
                } else {
                    //					写入文件
                    writeFile();

                }
            });

        }
    });
    //	写入文件
    function writeFile() {
        fs.writeFile(fileName, JSON.stringify(req.body), function(err) {
            if (err) {
                res.status(200).json({
                    info: "用户注册失败，系统错误",
                    code: 3
                });
            } else {
                res.status(200).json({
                    info: "注册成功",
                    code: 0
                });
            }
        });

    }
});
// ***********************登录接口**************************
app.post("/login", function(req, res) {
    // 判断用户是否存在
    var fileName = "users/" + req.body.user + ".txt";
    // 判断这个文件是否存在
    fs.exists(fileName, function(ex) {
        if (ex) {
            // 存在
            // 读取这个文件  把该用户的密码读取出来
            fs.readFile(fileName, function(err, data) {
                var data = data.toString();
                data = JSON.parse(data);
                if (data.password == req.body.password) {
                    // 比较该用户的密码和前端传过来的密码是否一致
                    // 获取系统当前时间
                    var date = new Date();
                    // 设置时间是当前时间的后一个月
                    // cookie的有效期是一个月
                    date.setMonth(date.getMonth() + 1);
                    //    设置cookie  
                    res.cookie("user", req.body.user, date);

                    res.status(200).json({
                        info: "登录成功",
                        code: 0
                    });
                } else {
                    res.status(200).json({
                        info: "密码错误，请重新登录",
                        code: 2
                    });
                }
            });
        } else {
            // 不存在
            res.status(200).json({
                info: "该用户不存在，请重新登录",
                code: 1
            });

        }
    });
});
// *********退出登录********
app.get("/logout", function(req, res) {
    // 清除cookie
    res.clearCookie("user");
    res.send("<script>location.href='/'</script>");
});
app.listen(3000, function() {
    console.log("服务器开启中......");
});