const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/url-shortner",{
    useCreateIndex : true,
useNewUrlParser:true,
useUnifiedTopology:true})
.then(()=>{
    console.log("mongoose conected");
}).catch((err)=>{
    console.log("mongoose  not conected");
})
