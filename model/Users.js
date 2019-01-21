let connection = require('../Config/Db')
var bcrypt = require('bcryptjs')
let jwtUtils = require('../Secret/jwt.utils.js')

class Users {

    static RegisterUser(fullname,mail,password,callback){
        
    
        bcrypt.hash(password , 5 , (err, bcryptPassword)=>{

            connection.query("INSERT INTO users (fullname,mail,password) VALUES (?,?,?)",[fullname,mail,bcryptPassword,callback],(err, result) => {
                if(err) {
                    callback({
                        "message": "Erreur"
                    })
                }else{
                    callback({
                        "message": "user created"
                    })
                }
            })
        })
     

        
    }
    static RegisterAdmin(firstname,lastname,mail,password,callback){
        
        bcrypt.hash(password , 5 , (err, bcryptPassword)=>{

            connection.query("INSERT INTO admin (first_name,last_name,mail,password) VALUES (?,?,?,?)",[firstname,lastname,mail,bcryptPassword,callback],(err, result) => {
                if(err) {
                    callback({
                        "message": "Erreur"
                    })
                }else{
                    callback({
                        "message": "admin created"
                    })
                }
            })
        })
        
    }
    static LoginUser(mail,password,callback){
        const sqlSelectEmail = "SELECT * FROM users WHERE mail = ?"
        const values = [
            [mail]
        ]

        connection.query(sqlSelectEmail, [values], (err,result) => {
            if(err) {
                callback({
                    "message": "error on selecting"
                })
            }

            if(result.length == 0) {
                callback ({
                    "message": "Wrong credentials"
                })
            }else {
                // check  the password if correct or not
                if(bcrypt.compareSync(password, result[0].password)) {
                    // generate a token
                    // payload contain user id
                    const token = jwtUtils.generateTokenForUser(result[0].id+"")
                    callback({
                        "id": result[0].id,
                        "uname" : result[0].fullname,
                        "token": token
                    })

                }else {
                    callback({
                        "message": "Wrong credentials"
                    })
                }
            }
            
        })
    }
    static LoginAdmin(mail,password,callback){
        const sqlSelectEmail = "SELECT * FROM admin WHERE mail = ?"
        const values = [
            [mail]
        ]

        connection.query(sqlSelectEmail, [values], (err,result) => {
            if(err) {
                callback({
                    "message": "error on selecting"
                })
            }

            if(result.length == 0) {
                callback ({
                    "message": "Wrong credentials"
                })
            }else {
                // check  the password if correct or not
                if(bcrypt.compareSync(password, result[0].password)) {
                    // generate a token
                    // payload contain user id
                    const token = jwtUtils.generateTokenForUser(result[0].id+"")
                    callback({
                        "message": "success...",
                        "id": result[0].id,
                        "token": token
                    })

                }else {
                    callback({
                        "message": "Wrong credentials"
                    })
                }
            }
            
        })
    }
    

} 
module.exports = Users