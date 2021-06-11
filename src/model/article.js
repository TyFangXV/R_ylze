const mongoose = require("mongoose");

const getCurrentDate = ()=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

const articleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required :  true
    },
    markdown : {
        type : String,
        required : true
    },
    tags : {
        type : String,
        required :  false
    },
    like : {
        type : Number,
        required : true
    },
    comment : {
        type : Array,
        required : true
    },
    createdAt : {
       type : String,
       default : getCurrentDate
    }

})

module.exports = mongoose.model("article", articleSchema)