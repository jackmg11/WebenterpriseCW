const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    username:String,
    password:String
})

module.exports = mongoose.model("user",userschema)