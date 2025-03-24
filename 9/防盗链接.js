const express= require('express');

const app = express();

//http://127.0.0.1能访问到图片
//http://localhost不能访问图片

app.use((req,resp,next)=>{
    //检查请求的头文件referer是不是127.0.0.1
    let referer = req.get('referer');
    if(referer){
        let url = new URL(referer);
        let hostname = url.hostname;
        if(hostname !== '127.0.0.1'){
            resp.status(404).send(`<h1>404 Not Found</h1>`);
            return;
        }
    }
    next();
});
//创建路由
app.get('/',(req,resp)=>{
    resp.sendFile(__dirname+'/img.html');
})
app.use(express.static(__dirname+'/public'));
app.get('*',(req,resp)=>{
    resp.send(`<h1>404 Not Found</h1>`);
});


app.listen(9000,()=>{
    console.log('成功');
})