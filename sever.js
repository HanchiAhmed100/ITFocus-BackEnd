let express = require('express')

let app =  express()


// Mise en palce de l'envirement 
let cors  = require('cors')
let bodyParser = require('body-parser')

var corsOptions = {
    origin: 'http://localhost:3008',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
  
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
app.use(cors());

// Middelwares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


let Article = require('./route/Article')
let Comment = require('./route/Comment')
let Users = require('./route/Users')
let Like = require('./route/Like')


app.use('/api/article', Article )
app.use('/api/comment', Comment )
app.use('/api/auth', Users )
app.use('/api/like', Like )

app.listen(3008)