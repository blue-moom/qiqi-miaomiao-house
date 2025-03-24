const express = require('express');

const app = express();

app.get('/',(req,resp)=>{
    //重定向
    // resp.redirect('https://www.baidu.com');

    //下载
    //resp.download(__dirname+'/package-lock.json');

    //返回json
    // resp.json(
    //     {
    //         username:'张三',
    //         age:18
    //     }
    // );

    //返回文件
    //resp.sendFile(__dirname+'/post.html');
});

app.listen(9000,()=>{
    console.log('成功');
})