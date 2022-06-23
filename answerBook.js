const express = require('express');
const app  = express();

const mysql = require('mysql2');

app.use(express.static('yt'));

app.listen(444);

app.get('/getbookname','/getprice',(req,resp) =>{
    console.log("ajax function is  called");

    const bookobject = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'suraj',
	port:3306
    }

    const conn = mysql.createConnection(bookobject);
    let output = {status:false,detail:{bookid:0,bookname:"",price:""}}
    let bookid = req.query.bookid;
    console.log(bookid);
    conn.query('select * from book where bookid=?',[bookid],
    (error,rows) =>{
        if(error){
            console.log(error);
        }
        else{
            if(rows.length>0) {
                output.status = true;
                output.detail = rows[0];
            }
            else{
                console.log("No book with this bookid");
            }
        }
        console.log(output);
        resp.send(output);
    });
    

});
app.get('/updateprice',(req,resp) =>{
    console.log("ajax function is called");
    const bookobject = {
            host: 'localhost',
            user: 'root',
            password: 'cdac',
            database: 'suraj',
            port:3306
            }
            const conn = mysql.createConnection(bookobject);
            let output = {status:false}
            let bookid = req.query.bookid;
            let price = req.query.price;
            console.log(bookid);
            conn.query('update book set price = ? where bookid = ?', [price,bookid],
            (error,res)=>{
                if(error) {
                    console.log(error);
                }else{
                    if(res.affectedRows > 0) {
                        output.status = true;
                    }
                    else {
                        console.log("price not updated");
                    }
                }
                console.log(output);
                resp.send(output);
            });
});