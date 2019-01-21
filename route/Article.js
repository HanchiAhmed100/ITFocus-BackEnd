let express = require('express');
let bodyparser = require('body-parser')
let router = express.Router();
let Article = require('../model/Article')
let cors  = require('cors')

var whitelist = ['http://localhost:8080/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.get('/',(req,res)=>{
    Article.GetAllArticle(function(data){
        res.status(200).json({"Article" : data})
    })
})

router.get('/first',(req,res)=>{
    Article.getFristArticle(function(data){
        res.status(200).json({"Article" : data})
    })
})

router.get('/popular',(req,res)=>{
    Article.getarticlebylikes(function(data){
        res.status(200).json({"Article" : data})
    })
})

router.get('/:id',(req,res)=>{
    var id = req.params.id
    Article.GetOneArticle(id,function(data){
        res.json({"Article" : data})
    })
})

router.get('/first/',(req,res)=>{
    Article.GetOneArticle(function(data){
        res.json({"Article" : data})
    })
})

router.post('/',(req,res)=>{
    var titre = req.body.titre
    var des = req.body.des
    var badge = req.body.badge
    var uid = req.body.uid
    var uname = req.body.uname
    var mydate = new Date()

    Article.InsertArticle(titre,des,badge,mydate,uid,uname,function(data){
        res.send({"Inserting ..." : data})
    })
})

router.put('/:id',(req,res)=>{
    var id = req.params.id
    var titre = req.body.titre
    var badge = req.body.badge
    var des = req.body.des
    var mydate = new Date()

    Article.UpdateArticle(id,titre,des,badge,function(data){
        res.send({"Update ..." : data})
    })
})

router.delete('/:id',(req,res)=>{
    var id = req.params.id
    Article.DeleteArticle(id,function(data){
        res.send({"deleting ... " : data })
    })
})





module.exports = router