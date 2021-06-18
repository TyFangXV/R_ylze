let data = [];
const express = require("express");

const router = express.Router()

const articleModel = require("../model/article")


router.get("/", (req,res)=>{
    res.send("article data")
})

router.get("/v/:id", async(req, res)=>{
   const articles = await articleModel.findById(req.params.id);
   res.render("article/post", {article : articles})
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
      sanitzedHtml : "-"
  })
  try {
   article =  await article.save();
   console.log(article)
   res.redirect(`/article/v/${article.id}`)
      
  } catch (error) {
     console.log(error.message) 
  }

})


router.post("/p/:id/postcomment", async(req,res)=>{
    let oldArticleData = await articleModel.findById(req.params.id);
    oldArticleData.comment.forEach(i =>{
        data.push(i);
    })
        data.push(req.body.comment);
    let newArticleData = await articleModel.findByIdAndUpdate(req.params.id, {
       comment :  data
    })
        data.length = 0;
    res.redirect(`/article/v/${req.params.id}`)
})


router.delete("/v/:id", async(req,res)=>{
     await articleModel.findByIdAndDelete(req.params.id);
    res.redirect(`/`)
})

module.exports = router;