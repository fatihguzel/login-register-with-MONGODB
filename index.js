var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
const path = require('path')

app.use('/css',express.static(path.join(__dirname, 'public/styles.css')));
app.use('/css',express.static(path.join(__dirname, 'public/app.js')));


mongoose.connect('mongodb+srv://loginregister:login123@cluster0.1nto8.mongodb.net/login-register?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",async(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('/sign_up')

})


app.get("/",async(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.sendFile(path.resolve(__dirname+ '/public/index.html'))
}).listen(3000);

app.get('/sign_up',async(req,res)=> {
    return res.sendFile(path.resolve(__dirname+ '/public/signup_success.html'))
})

console.log("Listening on PORT 3000");