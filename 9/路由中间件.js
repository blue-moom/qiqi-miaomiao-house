/**
 * 需求：
 * 针对访问/home /admin 的请求，要求url中必须携带code=521，如果未携带提示【暗号错误】,用以拦截
 */
const { text } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

//路由中间件
let routerMiddleware = (req,resp,next)=>{
    //获取code
    let {code} = req.query;
    if(code !== '521'){
        resp.send('暗号错误');
        return;
    }
    text();
}

app.post('/',(req,res) => {
    console.log(res.body);
    res.send({
        message:'请求成功',
        code:200
    })
})

app.listen(3000,()=>{
    console.log('成功');
})

