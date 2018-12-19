var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});


router.post('/',function(req,res,next){
  console.log('req body '+req.body.emailid)
  res.redirect('/chat/?email=' +req.body.emailid +'&name='+req.body.name)
})

module.exports = router;
