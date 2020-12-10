const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Pranay:REDcherry@cluster0.csuem.gcp.mongodb.net/test?authSource=admin&replicaSet=atlas-142jk5-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true";

app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
app.get('/', (req, res) => {
    res.send('Running.............');
});

app.post('/register', (req, res) => {
    console.log(req.body.name)

    MongoClient.connect(url, (err, db) =>{
        if (err) throw err;
        var dbo = db.db("Crud");

        var myobj = { name:req.body.name, number: req.body.number,dob: req.body.dob, email: req.body.email,tenth: req.body.tenth, twelth: req.body.twelth, cgpa: req.body.cgpa };
        dbo.collection("Testing Register").insertOne(myobj, (err, res)=> {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        })
        res.send("Registered")

      })
})


app.post('/getdata', (req, res) => {
    console.log(req.body.email)

    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;
        var dbo = db.db("Crud");
        var query = { email: req.body.email };
        dbo.collection("Testing Register").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.json({
            message:result
          })
        });
      });



})

app.post('/update', (req, res) => {
    console.log(req.body.email)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Crud");
        var myquery = { email: req.body.email };
        var newvalues = { $set: {name:req.body.name, number: req.body.number, email: req.body.email,tenth: req.body.tenth, twelth: req.body.twelth, cgpa: req.body.cgpa} };
        dbo.collection("Testing Register").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
          
        });
        res.send("Done")
      });



})

app.post('/delete', (req, res) => {
    console.log(req.body.email)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Crud");
        var myquery = { email: req.body.email };
        dbo.collection("Testing Register").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          db.close();
        });
        res.send("Done")
      });



})

app.listen(PORT,function()
 {
     console.log("Deployed ")
 });

