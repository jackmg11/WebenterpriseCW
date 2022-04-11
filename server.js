if(process.env.NODE_ENV !== "production"){
  require("dotenv").config()

}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const uri = "mongodb+srv://Unilogin:h1RMiyYukPBouPAl@cluster0.cvnwu.mongodb.net/webdatadb?retryWrites=true&w=majority"
const profiles = require("./routes/profiles")
const comments = require("./routes/comments")
const bodyParser = require("body-parser");
const path = require("path")
const cookieParser = require('cookie-parser')
const session = require('express-session')


const { default: mongoose } = require("mongoose")


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(cookieParser())
const passport = require('passport')
const initializepassport = require("./passportconfig")
const user = require("./models/user")
initializepassport(passport, username => user.findOne({"username": username}), id => user.findOne({"_id": id}))
app.use(session({
  secret: process.env.SECRET, resave:false, saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(uri,() => {
  console.log("Database connected")
})

app.get('/', (req, res) => {
  res.render("index")
})

app.use("/profiles", profiles)
app.use("/comments", comments)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})