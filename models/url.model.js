const mongoose = require("mongoose")
const shortUrlSchema = new mongoose.Schema({
    url:{
        type:String,
        required : true
    },
    shortId:{
        type:String,
        required : true
    }
   
});



const ShortUrl = mongoose.model("shortUrl",shortUrlSchema)
module.exports = ShortUrl;