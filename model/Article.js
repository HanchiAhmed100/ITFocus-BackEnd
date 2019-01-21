let connection = require('../Config/Db')
var bcrypt = require('bcryptjs')

class Article {

    static GetAllArticle(callback){        
        connection.query('SELECT * from article order by id desc',[callback] , (err, rows) =>{
            if (err) throw err
            callback(rows)
        })
    }
    static getFristArticle(callback){
        connection.query('SELECT * FROM Article order by id desc limit 1', [callback],(err,rows)=>{
            if(err) throw err
            callback(rows)
        })
    }

    static getarticlebylikes(callback){
        connection.query('Select likes.a_id,count(*) from article join likes on article.id = likes.a_id GROUP BY likes.a_id ',[callback],(err,row)=>{
            if(err) {throw err}
            else{
                let  i = row[0].a_id
                connection.query('Select * from article where id = ? ',[i,callback],(err,row)=>{
                    if (err) throw err
                    callback(row)
                })
            }
        })
    }

    static GetOneArticle(id,callback){
        connection.query('SELECT * from article where id = ? ',[id,callback] , (err, rows) =>{
            if (err) throw err
            callback(rows)
        })
    }
    static InsertArticle(titre,desc,badge,date,uid,uname,callback){
        connection.query('Insert into article (titre,des,badge,date,u_id,u_name ) values (?,?,?,?,?,?)',[titre,desc,badge,date,uid,uname,callback],(err,rows)=>{
            if (err) throw err
            callback(rows)
        })
    }
    static UpdateArticle(id,titre,des,badge,callback){
        connection.query('Update article set titre = ? , des = ? , badge = ? where id = ? ',[titre,des,badge,id,callback],(err,rows)=>{
            if (err) throw err
            callback(rows)
        })
    }
    static DeleteArticle(id,callback){
        connection.query('DELETE from article where id = ? ',[id,callback] , (err, rows) =>{
            if (err) throw err
            callback(rows)
        })
    }

    static Like(uid,aid,callback){
        connection.query('Insert into likes (u_id,a_id) values (?,?)',[uid,aid,callback],(err,row)=>{
            if (err) throw err
            callback(row)
        })
    }
    static GetPostLikes(aid,callback){
        connection.query('SELECT *  FROM likes where a_id = ? ',[aid,callback],(err,row)=>{
            if (err) throw err
            callback(row)
        })
    }
    static UnLike(aid,uid,callback){
        connection.query('Delete From likes where a_id = ? and u_id = ?',[aid,uid,callback],(err,row)=>{
            if (err) throw err
            callback(row)
        })
    }
} 
module.exports = Article