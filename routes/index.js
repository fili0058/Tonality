var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tonality' });
});


//makes a new grid on the database - all blue squares
/*router.get('/newgrid', function(req, res) {
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
});*/
    //router that modifies the database with the new color
 router.post('/modify', function (req, res){
   
     //require the database as a variable
    var db = req.db;
    var collection = db.get('grid');

     //set all the important variables from the ajax post and make sure they are numbers
     
     var browserRow = req.body['localRow'];
     var queryRow = Math.floor(browserRow);
     
     var browserCol = req.body['localCol'];
     var queryCol = Math.floor(browserCol);
     
      var browserHue = req.body['localHue'];
     var browserHueNum = 196;
    
     if (browserHue == "blue"){
         browserHueNum = 196;
     }else if (browserHue == "green"){
         browserHueNum = 164;
     }else if (browserHue == "orange"){
         browserHueNum = 5;
     }else if (browserHue == "purple"){
        browserHueNum = 276;
     }
     
     //look at the current square and make the appropriate actions
     collection.find({ "row": queryRow, "col": queryCol },{},function(e,docs){
           var doc = { usercollection : docs };
   
            var findHue = docs['0'];
            var databaseHue = findHue['hue'];
             var databaseLum = findHue['lum'];
         
            //get the average color instead of the full color
            var averageHue = (databaseHue + browserHueNum) /2;
            
            //run functions that send the variables outside of the current function
            setHue(averageHue);
            calculateLum(databaseLum);
        });

    var browserLight = req.body['light'];
     
     //gets the hue variable out of the previous call to the database
     var modifyHue;
         
     function setHue(intoVar){
            modifyHue = intoVar;
     }
     //modifies the luminosity based on the influence variable then sends both hue and luminosity to the database 
     function calculateLum(dataLum){
        
         if (browserLight == 'true'){
            var newLum = dataLum + 10;
             if (newLum < 100){
                setNewColor(modifyHue, newLum);
             }
         }else{
             
            newLum = dataLum - 10;
             if (newLum > 0){
                    setNewColor(modifyHue, newLum);
             }
         }
     }
    
         
    function setNewColor(hueToSet, lumToSet){
        //updates the database with the new values
        collection.update(
        { "row": queryRow, "col": queryCol },
            { 
            $set: 
                { hue: hueToSet, lum: lumToSet }
            }
        )
    }
        //collects the whole database and sends it back to the browser
       collection.find({},{},function(e,docs){
           var doc = { usercollection : docs };
           
            res.send(doc);
        });
});

//refreshes the grid, this router is called once when the page loads and every time the player moves to a different square.
router.post('/refresh', function (req, res){

    var db = req.db;
    var collection = db.get('grid');


       collection.find({},{},function(e,docs){
           var doc = { usercollection : docs };
 
    res.send(doc);
     
        });
      
});

module.exports = router;
