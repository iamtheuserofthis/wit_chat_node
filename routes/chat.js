var express = require('express')
var router = express.Router()

router.get('/',(req,res,next)=>{
    res.render('chat',{'details': {'title':'Chatbot','name':req.query.name,'email':req.query.email}})
})

module.exports=router
