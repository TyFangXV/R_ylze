const express = require("express");
const router = express.Router()


router.get("/", (req,res)=>{
    res.send("article data")
})

router.get("/new", (req, res)=>{
    res.render("article/new")
})

router.post("/post", (req,res)=>{
    
})

module.exports = router;