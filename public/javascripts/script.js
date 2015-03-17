console.log("works");

$(document).ready(function() {

var cRow = 15;
var cCol = 15;
var cColor = 196;
//influence: true = light   false = dark
var influence = true;
    
refreshLocal(); 
    
    
    /* setInterval(function()
            {*/
    $.ajax({
        //url: 'http://localhost:5000/ajax',
        url: 'http://tonality.herokuapp.com/ajax',
        dataType: "json",
        jsonpCallback: "_testcb",
        cache: false,
        timeout: 5000,
        success: function(data) {
            console.log(data);
            
            var test = data['usercollection'];
            console.log (test);
            var test2 = test[0];
            console.log(test2['_id']);
            
            $("section:nth-of-type(5) div:nth-of-type(5)").css("background-color", "hsl(" + test2['hue'] + ", 60%, " + test2['lum'] + "%)");
            
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
         
    /*  },1000);*/
         
    
    $(document).keydown(function(e)
    {
        // left arrow
         if (e.keyCode == 37) {
         
         //console.log("left");
    $.ajax({
        //url: 'http://localhost:5000/left',
        url: 'http://tonality.herokuapp.com/left',
        dataType: "text",
        jsonpCallback: "_testcb",
        cache: false,
        timeout: 5000,
        success: function(data) {
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
    
             
         }   
         if (e.keyCode == 38) { 
         
             cRow--;
             refreshLocal();
             $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
             
       /*      $.ajax({ 
           url: '/send',
            
           type: 'POST',
           cache: false, 
                 
            dataType: "json",
           data: { field1: 1, field2: 2 }, 
           success: function(data){
              console.log(data)
           }
           , error: function(jqXHR, textStatus, err){
               alert('text status '+textStatus+', err '+err)
           }
        })
         */
             
         
         }   // up arrow
         if (e.keyCode == 39) { 
         
         /*    $.ajax({
        url: 'http://localhost:5000/newgrid',
        //url: 'http://tonality.herokuapp.com/left',
        dataType: "text",
        jsonpCallback: "_testcb",
        cache: false,
        timeout: 5000,
        success: function(data) {
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });*/
             
             console.log("right");
         
         }   // right arrow
         if (e.keyCode == 40) { console.log("down");
                              
                              cRow++;
                               refreshLocal();
                               $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                              
                              }   // down arrow 
        
         if (e.keyCode == 32) { console.log("space"); 
                              cColor = 5;
                               refreshLocal();
                              }
        
        if (e.keyCode == 13) { console.log("enter"); }
        
     });
  
    
    
    function refreshLocal(){
    $('section:nth-of-type(' + cRow+ ') div:nth-of-type(' + cCol + ')').css("background-color", 'hsl(' + cColor + ', 60%, 50%)').css("box-shadow", '0 0 18px hsl(' + cColor + ', 100%, 50%)' );
}
    
    
});






