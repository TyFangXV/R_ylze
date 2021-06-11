const express = require("express");
const router = express.Router()

const articleModel = require("../model/article")

router.get("/", (req,res)=>{
    res.send("article data")
})

router.get("/v/:id", (req, res)=>{
    articleModel.findById(req.params.id, (err, data)=>{
        if(err) console.log(err.message)
        if(data == null) res.render("/")
        res.render("article/post", {article : data})
    })
})

router.get("/new", (req, res)=>{
    res.render("article/new")
})

router.post("/newpost", async(req,res)=>{
  let article = new articleModel({
      title : req.body.title,
      desc : req.body.desc,
      markdown: req.body.markdown,
      tags : req.body.tags,
      like : 0,
      comment : [],
  })
  try {
   article =  await article.save();
   console.log(article)
   res.redirect(`/article/v/${article.id}`)
      
  } catch (error) {
     console.log(error.message) 
  }

})

module.exports = router;