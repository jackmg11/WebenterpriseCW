const MongoClient = require("mongodb").MongoClient;
const express = require('express')
const app = express()
const port = 3000
const uri = "mongodb+srv://Unilogin:h1RMiyYukPBouPAl@cluster0.cvnwu.mongodb.net/webdatadb?retryWrites=true&w=majority"
const client = new MongoClient(uri, {useNewUrlParser: true});

MongoClient.connect(uri, function (err, db) {
  if(err) throw err;
  console.log('Start the database stuff');
  //Write databse Insert/Update/Query code here..
  });
 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})