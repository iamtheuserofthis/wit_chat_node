var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index', success:false, errors:req.session.errors});
  req.session.errors = null //to clear all the errors after the page has been rendered
});


router.post('/submit',function(req,res,next){
  req.check('email', 'Invalid Email Address').isEmail()
  req.check('name', 'Invalid name').matches('[A-Za-z]+')
  var errors = req.validationErrors()
  if(errors){
  req.session.errors=errors
  res.redirect('/')
  }else{
    res.redirect('/chat/?name='+req.body.name+'&email='+req.body.email)
    }

})
  

module.exports = router;
