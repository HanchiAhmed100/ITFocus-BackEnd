let express = require('express');
let bodyparser = require('body-parser')
let router = express.Router();
let Users = require('../model/Users')

router.post('/logusers',(req,res)=>{

    var mail  = req.body.mail
    var password = req.body.password

    Users.LoginUser(mail,password,function(data){
        res.send({"s" : data})
    })
})

router.post('/logadmin',(req,res)=>{
    var mail  = req.body.mail
    var password = req.body.password

    Users.LoginAdmin(mail,password,function(data){
        res.send({"satuts " : data})
    })
})

router.post('/regusers',(req,res)=>{
    
    var mail  = req.body.mail
    var password = req.body.password
    var fullname  = req.body.fullname


    Users.RegisterUser(fullname,mail,password,function(data){
        res.send({"ss" : data})
    })
})

router.post('/regadmin',(req,res)=>{

    var mail  = req.body.mail
    var password = req.body.password
    var firstname  = req.body.firstname
    var lastname = req.body.lastname

    Users.RegisterAdmin(firstname,lastname,mail,password,function(data){
        res.send({"ss" : data})
    })
})

module.exports = router