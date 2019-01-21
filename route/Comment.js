let express = require('express');
let bodyparser = require('body-parser')
let router = express.Router();
let Comment = require('../model/Comment')

let Article = require('../model/Article')

router.get('/:id',(req,res)=>{
    var id = req.params.id
    Article.GetOneArticle(id,function(data){
        Comment.ArticleComment(id,function(data2){
            res.send({"article":data,"comment":data2})
        })
    })
})

router.post('/',(req,res)=>{
    var Uid = req.body.Uid
    var Aid = req.body.Aid
    var uname = req.body.uname
    var mytext = req.body.mytext
    var mydate = new Date()

    Comment.InsertComment(Uid,uname,Aid,mytext,mydate,function(data){
        res.send({"Inserting ..." : data})
    })
})

router.put('/:id',(req,res)=>{
    var id = req.params.id
    var mytext = req.body.mytext

    Comment.UpdateComment(id,mytext,function(data){
        res.send({"Update ..." : data})
    })
})

router.delete('/:id',(req,res)=>{
    var id = req.params.id
    Comment.DeleteComment(id,function(data){
        res.send({"deleting ... " : data })
    })
})

module.exports = router