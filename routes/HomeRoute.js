const router = require("express").Router()


router.get("/", (req,res)=>{
    res.render("index")
    //console.log(req.db);
})






module.exports={
    path:"/",
    router
}