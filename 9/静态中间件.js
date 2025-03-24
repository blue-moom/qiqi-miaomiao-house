const express = require('express');


const app = express();

//静态中间件,默认访问路径 index.html文件，如果静态资源与动态资源路径一致，谁先加载谁先返回
app.use(express.static(__dirname+'/public'));

//访问 index.html
app.get('/',(req,resp)=>{
    resp.send('前台页面');
});

app.get('*',(req,resp)=>{
    resp.send('<h1>404 Not Found</h1>');
});



app.listen(9000,()=>{
    console.log('成功');
})