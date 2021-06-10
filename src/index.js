require("dotenv").config();
const express = require("express");
const path = require("path");
const articleRoute = require("./router/article");
const app = express();

//mock data
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
const articles = [{title : "Self love", createdAt : today, desc : "self love"}]


//express settings 
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname + "/views"))
app.use("/public", express.static(path.join(__dirname + "/public")))

app.use("/article", articleRoute);

app.get("/", (req,res)=>{
    res.render("index.ejs", {article : articles})
})



app.listen(process.env.PORT, ()=>{
    console.log("server up")
})
