const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db2'
});


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('连接成功');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/login', (req, res) => {
const { username, password } = req.body;

 
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      throw err;
    }

   
    if (results.length > 0 && results[0].password === password) {
    
      res.redirect('/success');
    } else {
     
      res.redirect('/failure?error=invalid_credentials');
    }
  });
});


app.get('/success', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>成功登录</title>
<style>
div{
    color: crimson;
    }
</style>
</head>
<body>
    <h2 align="center">成功登录</h2>
    <h2 align="center">欢迎您</h2>
    <div align="center">5</div> 
    <p align="center" >
    <lable >正在跳转，请稍后....</lable>
    </p>
    <script>
    var abc = document.getElementsByTagName('div')[0];
    var time = 5;
    var timer = setInterval(function(){
        time --;
        if (time == 0){
            clearInterval(timer);
            location.href = 'https://www.bilibili.com/';
        }
        abc.innerHTML = time;
    },1000);
    </script>
</body>
</html>
`);
});
 

app.get('/failure', (req, res) => {
    const error = req.query.error || 'Unknown error';
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>登录失败</title>
        </head>
        <body style="text-align: center;">
            <h2>登录失败</h2>
            <p>用户名或密码错误</p>
            <a href="/">重新登录</a>
            <hr>
        </body>
        </html>
`);
});
 

app.get('/', (req, res) => {
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录页面</title>
    <style>
        #div1{
            border: 0px solid  ;
            margin:0 auto;
            width: 1430px;
            height: 720px;
            padding-top: 50px;
        }
        #div2{
            border: 7px solid rgb(230, 230, 237);
            margin:0 auto;
            width: 900px;
            height: 500px;
            background-color: white;
            margin-top: 50px;
        }
        #div3{
            float: left;
            
        }
        #div3 > p:first-child{
            color: #fbc71f;
            font-size: 22px;
        }
        #div3 > p:last-child{
            color:rgb(165, 165, 165);
            font-size:22px;
        }
        
        button{
            background-color:#fbc71f;
               color:white;
             width: 90px;
             height: 35px;
              border:0;
              font-size: 16px;
              box-sizing: content-box;
                 border-radius: 5px;
        }
        button:hover{
             background-color: #a54b4a;
        }

        


       
    </style>
</head>
<body>
    <form action="/login" method="POST">
    <div id="div1">
        <div id="div2">
            <div id="div3">
                <p style="margin-left: 15px;">欢迎登录</p>
                <p style="margin-left: 15px;">WELCOME TO LOGIN</p>
            </div>
            <p align="center" style="margin-right: 40px; margin-top: 160px;">
            <label for="username" style="margin-right: 40px;">用户名</label>
            <input type="text" name="username"placeholder="请输入用户名" required id="username" />  
            </p><br>

            <p align="center" style="margin-right: 25px; margin-top: -10px;">
            <label for="password" style="margin-right: 40px;"  >密码</label>
            <input type="password" id="password" required name="password" placeholder="请输入密码"/ ><br>
            </p>
            <p align="center" style="margin-top: 40px;">
                <button type="submit" id="go">登录</button></a>
            </p>
</body>
</html>
`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});