let connection = require('../Config/Db')
var bcrypt = require('bcryptjs')

class Comment {

    static ArticleComment(Aid,callback){
        // Aid = Article id
        connection.query('SELECT * from comment where a_id = ? ',[Aid,callback] , (err, rows) =>{
            if (err) throw err
            callback(rows)
        })
    }

    static InsertComment(Uid,uname,Aid,mytext,mydate,callback){
        connection.query('Insert into comment (u_id,uname,a_id,mytext,mydate) values (?,?,?,?,?)',[Uid,uname,Aid,mytext,mydate,callback],(err,rows)=>{
            if (err) throw err
            callback(rows)
        })
    }
    static UpdateComment(id,mytext,callback){
        connection.query('Update comment set mytext = ? where id = ? ',[mytext,id,callback],(err,rows)=>{
            if (err) throw err
            callback(rows)
        })
    }
    static DeleteComment(id,callback){
        connection.query('DELETE from comment where id = ? ',[id,callback] , (err, rows) =>{
            if (err) throw err
            callback(rows)
        })
    }

} 
module.exports = Comment