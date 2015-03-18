console.log("works");

$(document).ready(function() {

var cRow = 15;
var cCol = 15;
var cColor = 164;
//influence: true = light   false = dark
var influence = true;

var updateInterval;    
    
    
refreshLocal(); 
    
    
    setInterval(function()
            {
                        $.ajax({ 
                                   //url: 'http://localhost:5000/modify',
                                    url: 'http://tonality.herokuapp.com/modify',

                                   type: 'POST',
                                   cache: false, 

                                    dataType: "json",
                                   
                                   success: function(data){
                                     // console.log(data)
                                       
                                       var test = data['usercollection'];
                                        //console.log (test);
                                     for (var i = 0; i<900; i++){    
                                        var test2 = test[i];
                                        //console.log(test2['_id']);

                                         if (test2['row'] == cRow && test2['col'] == cCol){

                                         }else{

                                        $("section:nth-of-type(" + test2['row'] + ") div:nth-of-type(" + test2['col'] + ")").css("background-color", "hsl(" + test2['hue'] + ", 60%, " + test2['lum'] + "%)");

                                         }
                                     }

                                       
                                       
                                   }
                                   , error: function(jqXHR, textStatus, err){
                                       alert('text status '+textStatus+', err '+err)
                                   }
                                })
        
         
      },300);
         
    
    $(document).keydown(function(e)
    {
        // left arrow
        if (e.keyCode == 37) {
     /*    
         //console.log("left");
    $.ajax({
        url: 'http://localhost:5000/left',
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
    });
    */
            cCol--;
                               refreshLocal();
                               $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("box-shadow", 'none' );
            
             
         }   
         if (e.keyCode == 38) { 
         
             //updateInterval = setInterval(function(){ updateGrid() }, 500);
             
            // function updateGrid() {
                                     cRow--;
                                     refreshLocal();
                                     $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );

                                   $.ajax({ 
                                   //url: 'http://localhost:5000/modify',
                                    url: 'http://tonality.herokuapp.com/modify',

                                   type: 'POST',
                                   cache: false, 

                                    dataType: "json",
                                   data: { localRow: cRow, localCol: cCol, localHue: cColor, light: influence }, 
                                   success: function(data){
                                     // console.log(data)
                                       
                                      /* var test = data['usercollection'];
                                        //console.log (test);
                                     for (var i = 0; i<900; i++){    
                                        var test2 = test[i];
                                        //console.log(test2['_id']);

                                         if (test2['row'] == cRow && test2['col'] == cCol){

                                         }else{

                                        $("section:nth-of-type(" + test2['row'] + ") div:nth-of-type(" + test2['col'] + ")").css("background-color", "hsl(" + test2['hue'] + ", 60%, " + test2['lum'] + "%)");

                                         }
                                     }
*/
                                       
                                       
                                   }
                                   , error: function(jqXHR, textStatus, err){
                                       alert('text status '+textStatus+', err '+err)
                                   }
                                })

                                   /*  $.ajax({
                                    url: 'http://localhost:5000/ajax',
                                    //url: 'http://tonality.herokuapp.com/ajax',
                                    dataType: "json",
                                    jsonpCallback: "_testcb",
                                    cache: false,
                                    timeout: 5000,
                                    success: function(data) {
                                        //console.log(data);

                                        var test = data['usercollection'];
                                        //console.log (test);
                                     for (var i = 0; i<900; i++){    
                                        var test2 = test[i];
                                        //console.log(test2['_id']);

                                         if (test2['row'] == cRow && test2['col'] == cCol){

                                         }else{

                                        $("section:nth-of-type(" + test2['row'] + ") div:nth-of-type(" + test2['col'] + ")").css("background-color", "hsl(" + test2['hue'] + ", 60%, " + test2['lum'] + "%)");

                                         }
                                     }

                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                        alert('error ' + textStatus + " " + errorThrown);
                                    }
                                }); */
           //  }
         }   // up arrow
         if (e.keyCode == 39) { 
         

             
              cCol++;
                               refreshLocal();
                               $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol - 1) + ')').css("box-shadow", 'none' );
             
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
        
        
       /* if (e.keyCode == 48) { console.log("new grid"); 

                        $.ajax({
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
                        });
                 }*/
        
        });
    
/*    $(document).keyup(function(e)
    {
         if (e.keyCode == 38) {
            console.log("upkey released"); 
            clearInterval(updateInterval);
         }
    });*/
  
    
    
    function refreshLocal(){
    $('section:nth-of-type(' + cRow+ ') div:nth-of-type(' + cCol + ')').css("background-color", 'hsl(' + cColor + ', 60%, 50%)').css("box-shadow", '0 0 18px hsl(' + cColor + ', 100%, 50%)' );
}
    
    
});





/*$.ajax({
            url: 'http://localhost:5000/ajax',
            //url: 'http://tonality.herokuapp.com/ajax',
            dataType: "json",
            jsonpCallback: "_testcb",
            cache: false,
            timeout: 5000,
            success: function(data) {
                //console.log(data);
                
                var test = data['usercollection'];
                //console.log (test);
             for (var i = 0; i<900; i++){    
                var test2 = test[i];
                //console.log(test2['_id']);

                 if (test2['row'] == cRow && test2['col'] == cCol){
                     
                 }else{
                 
                $("section:nth-of-type(" + test2['row'] + ") div:nth-of-type(" + test2['col'] + ")").css("background-color", "hsl(" + test2['hue'] + ", 60%, " + test2['lum'] + "%)");
                     
                 }
             }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        });*/



