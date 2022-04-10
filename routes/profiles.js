const express = require("express");
const router = express.Router();
const user = require("../models/user")
const bcrypt = require("bcrypt")

router.get("/",(req,res) => {
    res.send("hello")    
})

router.get("/register",(req,res) => {
    res.render("register")  
})

router.post("/register",async (req,res) => {
    try{
    result = await user.findOne({"username":req.body.username})
    if(result){
        console.log("User already Exists")
        res.send("user already exists")
    }else { 
        const hashed = await bcrypt.hash(req.body.password,10)
        newuser = await new user({"username":req.body.username,"password":hashed})
        await newuser.save()
        res.send("user created")

    }
}catch (err){
    console.log(err)
    res.send("broke")
}

})


module.exports = router