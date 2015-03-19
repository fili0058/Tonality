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
    
      var db = req.db;
    var collection = db.get('grid');

     
     var browserRow = req.body['localRow'];
     //res.send(browserRow);
     var queryRow = Math.floor(browserRow);
     
     var browserCol = req.body['localCol'];
     //res.send(browserCol);
     var queryCol = Math.floor(browserCol);
     
      var browserHue = req.body['localHue'];
     var browserHueNum = 196;
    
     if (browserHue == "blue"){
         browserHueNum = 196;
     }else if (browserHue == "green"){
         browserHueNum = 164;
     }else if (browserHue == "orange"){
         browserHueNum = 5;
     }else if (browserHue == "pink"){
        browserHueNum = 347;
     }
     
     
    
     
     //console.log(browserHueNum);
     //res.send(browserHue);
     //var newHue = parseInt(' " ' + browserHue + ' " ');
     
     //var found = collection.find( { "row": 15, "col": 15  }, { } );
    //var myName = found.hue;
    //var done = tojson(myName);
     //var item = found['hue'];
     //var item2 = item['hue'];
     //var item3 = found['hue'];
    // console.log(item);
     //console.log(item2);
     //console.log(item3);
     
   /*  var callback = function(err, doc) {
    if (err) {
      console.log(err);
    }
    averageHue = doc[0];
    console.log(averageHue); 
}; */
     
     collection.find({ "row": queryRow, "col": queryCol },{},function(e,docs){
           var doc = { usercollection : docs };
           //console.log(docs)
        var findHue = docs['0'];
            var databaseHue = findHue['hue'];
         //var numHue = Math.floor(databaseHue);
         var averageHue = (databaseHue + browserHueNum);
        var  averageHue2 = averageHue / 2;
         //var numHue2 = Math.floor(averageHue);
        
        setHue(averageHue2);
    
     
        });
    // var averageHueNum = Math.floor(averageHue);
    
    
     
     //var currentHue = found.body['hue'];
     //console.log(done);
     
     var browserLight = req.body['light'];
     //res.send(browserLight);
     
     //var db = req.db;
    //var collection = db.get('grid');     
    function setHue(hueToSet){
     console.log(hueToSet);
     
     collection.update(
        { "row": queryRow, "col": queryCol },
            { 
            $set: 
                { hue: hueToSet }
            }
   
            )
     
    }
     
     
     
     
    
   
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
