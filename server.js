if(process.env.NODE_ENV !== "production"){
  require("dotenv").config()

}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const uri = "mongodb+srv://Unilogin:h1RMiyYukPBouPAl@cluster0.cvnwu.mongodb.net/webdatadb?retryWrites=true&w=majority"
const profiles = require("./routes/profiles")
const bodyParser = require("body-parser");
const path = require("path")
const cookieParser = require('cookie-parser')


const { default: mongoose } = require("mongoose")


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(cookieParser())



mongoose.connect(uri,() => {
  console.log("Database connected")
})

app.get('/', (req, res) => {
  res.render("index")
})

app.use("/profiles",profiles)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})