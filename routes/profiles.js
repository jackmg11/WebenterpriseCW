const express = require("express");
const router = express.Router();
const user = require("../models/user")
const bcrypt = require("bcrypt")
const passport = require("passport")

function Authed(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else{
        return res.redirect('/profiles/login')
    }
}

function notAuthed(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    } else{
        next()
    }
}

router.get("/login", notAuthed, (req, res) =>{
    res.render("login")
})



router.post("/login",notAuthed, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/profiles/login'
}));

router.get('/logout', Authed, (req, res) =>{
    req.logout()
    res.redirect('/')
})

router.get("/register",notAuthed, (req,res) => {
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

router.get('/profile', Authed, async (req, res) =>{
    result = await req.user.exec()
    res.render("profile", {"user": result})
})

router.post('/profile', Authed, async(req, res) => {
    if (req.body.action === "update"){
        u = await req.user.exec()
        username = req.body.username
        await user.updateOne({'_id': u._id}, {"username": username})
        res.send("user updated")
    } else if(req.body.action ==="delete"){
        u = await req.user.exec()
        req.logout()
        await user.deleteOne({"_id": u._id})
        res.send("user deleted")
    }
    
})


module.exports = router