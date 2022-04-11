const mongoose = require("mongoose")

const commentschema = new mongoose.Schema({
    body:String,
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model("comment",commentschema)