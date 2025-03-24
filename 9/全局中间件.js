/***
 * 需求
 * 记录每一个访问ip地址和url,用以记录
 */
//引入模块
const express = require('express');
const fs = require('fs');
const path = require('path');

//创建应用服务

const app = express();

//创建全局中间件
let globalMiddleware = (req,resp,next)=>{
    //获取url和ip
    let {ip,url} = req;
    //需要将ip和url写入文件名中
    fs.appendFileSync(path.resolve(__dirname,'./access,log'),`${ip} ${url} \r\n`);
    //调用下一个
    next();
}
//中间件的使用
app.use(globalMiddleware);

//创建路由
app.get('/home',(req,resp)=>{
    resp.send('前台页面');
});
app.get('/admin',(req,resp)=>{
    resp.send('后台页面');
});
app.get('*',(req,resp)=>{
    resp.send('<h1>404 Not Found</h1>');
});

//创建监听
app.listen(9000,()=>{
    console.log('成功');
})