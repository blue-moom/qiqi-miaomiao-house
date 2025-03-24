//引入模块
const express = require('express');
//创建应用服务
const app = express();
//创建路由
app.get('/',(req,resp)=>{
    resp.end('你好');//中文是乱码

   //原生响应
//    resp.statusCode = 404;
//    resp.statusMessage = 'Not Found';
//    resp.setHeader('aaa','bbbb');
//    resp.write('hello word');

//express 操作
// resp.status(500);
// resp.set('aaa','bbb');
// resp.send('hhhhhhhh');

//链式表达
// resp.status(500).set('xxx','dddd').send('你好');//如果使用send函数，返回的内容自动编码为utf-8，可以直接返回中文
});
//创建监听
app.listen(9000,()=>{
    console.log('成功');
})