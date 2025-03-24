const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const app = express()

//静态资源服务
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')))

//配置模板引擎
// app.set('views',path.join(__dirname,'views'))
// app.engine('.html',require('ejs').renderFile)
// app.set('view engine','html')
app.set('views',path.join(__dirname,'views'))
app.engine('.html',require('ejs').renderFile)
app.set('view engine','html')

//可以处理json格式的内容
app.use(bodyParser.urlencoded({extended:false}))

//加载路由
app.use(router)
//创建监听
app.listen(3000,() => {
    console.log('server is running at port 3000')
})