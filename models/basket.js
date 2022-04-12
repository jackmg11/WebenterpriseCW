const mongoose = require('mongoose')

const basketschema = new mongoose.Schema({
    items:[
        {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'item'
        }],
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model("basket", basketschema)