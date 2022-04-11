const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    username:String,
    password:String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("user",userschema)