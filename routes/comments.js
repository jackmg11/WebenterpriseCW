const express = require("express");
const router = express.Router();
const user = require("../models/user")
const comment = require("../models/comment")

function Authed(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else{
        return res.redirect('/profiles/login')
    }
}

router.get("/", Authed, async (req, res) =>{
    comments = await comment.find({}).populate({"path" : "creator", "select": "username"})
    u = await req.user.exec()
    if(comments === null){
        comments = []
    }

    res.render("comments", {"comments": comments, "user": u})
})
router.post("/", Authed, async (req, res) =>{
    if (req.body.action === "post"){
        u = await req.user.exec()
        await comment.create({"body": req.body.comment, "creator": u._id})
        res.send("comment posted")
    } else if (req.body.action === "delete"){
        await comment.deleteOne({"_id": req.body.id})
        res.send("comment deleted")
    }
})

module.exports = router