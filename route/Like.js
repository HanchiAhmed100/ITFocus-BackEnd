let express = require('express');
let bodyparser = require('body-parser')
let router = express.Router();
let Article = require('../model/Article')


router.post('/:id',(req,res)=>{
    var aid = req.params.id+""
    var uid = req.body.uid+""

    Article.Like(uid,aid,function(data){
        res.send({"Like ..." : data})
    })
})



router.post('/d/c',(req,res)=>{
    var aid = req.body.aid
    var uid = req.body.uid+""
    Article.UnLike(aid,uid,function(data){
        res.send({"deleting ... " : data })
    })
})


router.get('/:id',(req,res)=>{
    var aid = req.params.id+""
    Article.GetPostLikes(aid,function(data){
        res.send({"likes" : data})
    })
})


module.exports = router