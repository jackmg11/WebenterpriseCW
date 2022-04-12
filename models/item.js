const mongoose = require("mongoose")

const itemschema = new mongoose.Schema({
    name: String,
    price: Number
})


module.exports = mongoose.model("item",itemschema)