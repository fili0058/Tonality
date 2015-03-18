var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tonality' });
});



router.get('/newgrid', function(req, res) {
      var db = req.db;
    var collection = db.get('grid');
    
    
   for( var f=1; f<31; f++ ){
    
        for(var i=1; i<31; i++ ){
            
           collection.ensureIndex({"_id":1}),
                collection.insert(
                    {row: f, col: i, hue: 196, lum: 50 }   
                )
           
        }
    }
    res.send("new grid")
});





 router.post('/modify', function (req, res){
//var newvalue = req.body['field1'];
    //   Math.floor(newvalue);
       //var newnew = 9;
       //newnew += 10;
   //console.log(req.body);
   //console.log('req received');
    //var newstring = newnew.toString();
   //res.send(newstring);

     var browserRow = req.body['localRow'];
     //res.send(browserRow);
     var queryRow = Math.floor(browserRow);
     
     var browserCol = req.body['localCol'];
     //res.send(browserCol);
     var queryCol = Math.floor(browserCol);
     
      var browserHue = req.body['localHue'];
     //res.send(browserHue);
     var newHue = Math.floor(browserHue);
     
      var browserLight = req.body['light'];
     //res.send(browserLight);
     
     var db = req.db;
    var collection = db.get('grid');     
     
     collection.update(
        { "row": queryRow, "col": queryCol },
            { 
            $set: 
                { hue: newHue }
            }
   
    )
     
     
     
     
     
      var db = req.db;
    var collection = db.get('grid');
    
   
       collection.find({},{},function(e,docs){
           var doc = { usercollection : docs };
           //console.log(docs)
          
           //res.render('ajax', {docs: JSON.stringify(docs), title: 'Test'});
    res.send(doc);
     
        });
     
     
     
     
     
       //req.body['field1']
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
