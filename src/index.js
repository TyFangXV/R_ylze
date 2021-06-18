require("dotenv").config();
const mongoose = require("mongoose")
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");


const articleRoute = require("./router/article");
const articleModel = require("./model/article")


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(methodOverride("_method"))
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : false, useCreateIndex : true}, ()=>{
    console.log("mongo connected")
});





//express settings 
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname + "/views"))
app.use("/public", express.static(path.join(__dirname + "/public")))

app.use("/article", articleRoute);

app.get("/", async(req,res)=>{
   const data = await articleModel.find().sort({createdAt : "desc"})

    res.render("index.ejs", {article : data})

})



app.listen(process.env.PORT, ()=>{
    console.log("server up")
})
