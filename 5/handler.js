//导入模块
const config = require('./config')
const db = require('./common/db')
const path = require('path')
const formidable = require('formidable');
const { throws } = require('assert');

//返回主页
exports.showIndex = (req,res) =>{
    res.render('index') //render
}

//返回所有音乐
exports.getMusicList = (req,res) => {
    db.query('SELECT * FROM music02',(err,rows) => {
        if(err){
            throw err
        }
        console.log(rows)
        //返回一个json格式
        res.json({
            list:rows
        })
    })
}

//添加
exports.showAdd = (req,res) => {
    res.render('add')
}
//添加具体音乐
exports.doAdd = (req,res) => {
    const form = new formidable.IncomingForm()//创建添加的格式
    form.uploadDir = config.uploadDir //配置上传文件的路径
    formidable.keepExtensions = true //允许使用扩展名
    form.maxFieldsSize = 20*1024*1024 //配置上传文件的大小
    form.parse(req,(err,fields,files) => {
        if(err){
            throw err
        }
        //回调函数中，fields是表中的普通字段
        //files是文件信息
        console.log(fields)
        console.log(files)

        const title = fields.title
        const singer = fields.singer
        const music = path.basename(files.music.path)
        const img = path.basename(files.img.path)
        db.query('INSERT INTO music02(title,singer,music,img) VALUES(?,?,?,?)',[title,singer,music,img],(err,rows) => {
            if(err){
                throw err
            }
            res.redirect('/')
        })
    })
}

//查找数据
exports.showEdit = (req,res) => {
    const id = req.query.id
    //console.log(id)
    db.query('SELECT * FROM music02 WHERE id = ?',[id],(err,rows) => {
        if(err){
            throw err
        }
        res.render('edit',{
            music:rows[0]
        })
    })
}
//修改数据
exports.doEdit = (req,res) => {
    const id = req.query.id
    const title = req.body.title
    const singer = req.body.singer

    db.query('UPDATE music02 SET title = ?,singer = ? WHERE id = ?',[title,singer,id],(err,rows) => {
        if(err){
            throw err
        }
        if(rows.affectedRows !== 1){
            return res.json({
                code:2001,
                msg:'UPDATE FAILED'
            })
        }
        res.json({
            code:2000,
            msg:"update success"
        })
    })
}
//删除
exports.doRemove = (req,res) => {
    const id = req.query.id
    db.query('DELETE FROM music02 WHERE id = ?',[id],(err,rows) => {
        if(err){
            throw err
        }
        if(rows.affectedRows !== 1){
            return res.json({
                code:1001,
                msg:'remove failed'
            })
        }
        res.json({
            code:1000,
            msg:'remove success'
        })
    })
}