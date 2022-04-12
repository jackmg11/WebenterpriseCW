const express = require("express");
const router = express.Router();
const user = require("../models/user")
const item = require("../models/item")
const basket = require("../models/basket");
const { redirect } = require("express/lib/response");

function Authed(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else{
        return res.redirect('/profiles/login')
    }
}

router.get("/", Authed, async (req, res) =>{
    u = await req.user.exec()
    items = await item.find({})
    bsk = await basket.findOne({"owner":u._id})
    if (bsk){
    ammountInBasket = bsk.items.length
    } else{
        ammountInBasket = 0
    }
    res.render("store", {"items": items, "ammountInBasket":ammountInBasket, "admin": u.isAdmin})
})

router.post("/", Authed, async (req, res) =>{
    if(req.body.action === "add"){
        u = await req.user.exec()
        check = await basket.findOne({"owner": u._id})
        if(check){
            console.log(check)
            // If user has a basket then add item to it
            await basket.updateOne({"_id": check._id}, {"$push": {"items": req.body.id}})
            console.log("Item added to exisiting basket")
            res.send("item added")
        } else{
            // Otherwise create a basket tied to the user, and add the item
            bsk = await basket.create({"owner": u._id})
            await basket.updateOne({"_id": bsk._id}, {"$push": {"items": req.body.id}})
            console.log("Item added to new basket")
            res.send("item added")
        }
}
})
router.get("/manage", Authed, async (req, res) =>{
    u = await req.user.exec()
    if(u.isAdmin){
        items = await item.find({})
        res.render("manage", {"items": items})
    } else{
        redirect("/store")
    }
})

router.post('/manage', Authed, async (req, res) =>{
    if(req.body.action === "add"){
        await item.create({"name": req.body.name, "price": req.body.price})
        res.send("item added")
    }else if(req.body.action === "delete"){
        it = await item.findOne({"_id": req.body.id})
        baskets = await basket.updateMany({}, {"$pullAll" : {
            "items": [{"_id": it._id}]
        }})
        await item.deleteOne({"_id": req.body.id})
        
        res.send("item deleted")
    } 
})

router.get('/mybasket', Authed, async (req, res) =>{
    u = await req.user.exec()
    check = await basket.findOne({"owner": u._id}).populate("items")
    if(check){
        res.render("mybasket", {"items": check.items})
    } else{
        bsk = await basket.create({"owner": u._id})
        items = []
        res.render("mybasket", {"items": items})
    }

})

router.post('/mybasket', Authed, async (req, res) =>{
    if(req.body.action === "delete"){
    u = await req.user.exec()
    b = await basket.updateOne({"owner": u._id}, {"$pullAll" : {"items": [{"_id": req.body.id}]}})
    console.log(b)
    res.send("item deleted")
    }
})


module.exports = router