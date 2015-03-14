var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

    
router.get('/ajax', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
       collection.find({},{},function(e,docs){
        res.render('ajax', {
            "ajax" : docs
        });
    });
});


/*console.log("hello");
    setInterval(function()
    {
        console.log("table update");
    }, 200);*/
    

    
/*     document.keydown(function(e)
    {
         if (e.keyCode == 37) { console.log("left"); }   // left arrow
         if (e.keyCode == 38) { console.log("up"); }   // up arrow
         if (e.keyCode == 39) { console.log("right"); }   // right arrow
         if (e.keyCode == 40) { console.log("down"); }   // down arrow   
     });*/
    




module.exports = router;
