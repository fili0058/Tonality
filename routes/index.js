var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tonality' });
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

/*usercollection*/
    
router.get('/ajax', function(req, res) {
    var db = req.db;
    var collection = db.get('testdatabase');
    
   
       collection.find({},{},function(e,docs){
           var doc = { usercollection : docs };
           //console.log(docs)
           res.send(doc);
           res.render('ajax', {docs: JSON.stringify(docs), title: 'Test'});
   
      /* res.render('ajax', {
            "ajax" : docs
        });*/
         
           
   });
});

router.get('/left', function(req, res) {
      var db = req.db;
    var collection = db.get('testdatabase');

  var document = {username:"David", email:"About MongoDB"};
collection.insert(document, {w: 1}, function(err, records){
  //console.log("Record added as "+records[0]._id);
});
   //db.usercollection.insert({ "username" : "grey", "email" : "testuser1@testdomain.com" });
    res.send("left server")
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
