console.log("works");

$(document).ready(function() {

var cRow = 15;
var cCol = 15;
var cColor = "blue";
var colorNum = Math.floor((Math.random() * 4) + 0);
    changeColor();
    console.log(colorNum);
//influence: true = light   false = dark
var influence = true;

var updateInterval;    
    
    
refreshLocal(); 
    
    
    setInterval(function()
            {
                        $.ajax({ 
                           // url: 'http://localhost:5000/modify',
                            url: 'http://tonality.herokuapp.com/modify',

                                   type: 'POST',
                                   cache: false, 

                                    dataType: "json",
                                   data: { localRow: cRow, localCol: cCol, localHue: cColor, light: influence },
                                   success: function(data){
                                     console.log(data)
                                       
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
            
    if (cCol > 1){
        
            cCol--;
                               refreshLocal();
                               $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("box-shadow", 'none' );
            
            
            
            $.ajax({ 
                //url: 'http://localhost:5000/modify',
              url: 'http://tonality.herokuapp.com/modify',

                                   type: 'POST',
                                   cache: false, 

                                    dataType: "json",
                                   data: { localRow: cRow, localCol: cCol, localHue: cColor, light: influence }, 
                                   success: function(data){
                                       
                                   }, 
                                    error: function(jqXHR, textStatus, err){
                                       alert('text status '+textStatus+', err '+err)
                                   }
                                })
            
                }
         }   
         if (e.keyCode == 38) { 
             
                    if (cRow > 1){
                        
                                     cRow--;
                                     refreshLocal();
                                     $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );

                   $.ajax({ 
               url: 'http://localhost:5000/modify',
                //url: 'http://tonality.herokuapp.com/modify',

                   type: 'POST',
                   cache: false, 

                    dataType: "json",
                   data: { localRow: cRow, localCol: cCol, localHue: cColor, light: influence }, 
                   success: function(data){

                   }
                   , error: function(jqXHR, textStatus, err){
                       alert('text status '+textStatus+', err '+err)
                   }
                })
                                   
                    }
         }   // up arrow
         if (e.keyCode == 39) { 
         
            if (cCol < 30){
             
              cCol++;
                               refreshLocal();
                               $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol - 1) + ')').css("box-shadow", 'none' );
             
             $.ajax({ 
                // url: 'http://localhost:5000/modify',
                url: 'http://tonality.herokuapp.com/modify',

                                   type: 'POST',
                                   cache: false, 

                                    dataType: "json",
                                   data: { localRow: cRow, localCol: cCol, localHue: cColor, light: influence }, 
                                   success: function(data){
                                       
                                   }
                                   , error: function(jqXHR, textStatus, err){
                                       alert('text status '+textStatus+', err '+err)
                                   }
                                })
             //console.log("right");
         
             
            }
         }   // right arrow
         if (e.keyCode == 40) { console.log("down");
                              
                            if (cRow < 30){
                                
                              cRow++;
                               refreshLocal();
                               $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                              
                               
                   $.ajax({ 
            //  url: 'http://localhost:5000/modify',
               url: 'http://tonality.herokuapp.com/modify',

                       type: 'POST',
                       cache: false, 

                        dataType: "json",
                       data: { localRow: cRow, localCol: cCol, localHue: cColor, light: influence }, 
                       success: function(data){

                       }
                       , error: function(jqXHR, textStatus, err){
                           alert('text status '+textStatus+', err '+err)
                       }
                    })

                               
                                    }
                              }   // down arrow 
        
         if (e.keyCode == 32) { console.log("space"); 
                              
                               changeColor();
                               refreshLocal();
                              }
         if (e.keyCode == 13) { console.log("enter"); }
        
        
        if (e.keyCode == 48) { console.log("new grid"); 

                        $.ajax({
                               // url: 'http://localhost:5000/newgrid',
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
        
        });
    
  
    
    function refreshLocal(){
    $('section:nth-of-type(' + cRow+ ') div:nth-of-type(' + cCol + ')').css("background-color", 'hsl(' + cColor + ', 60%, 50%)').css("box-shadow", '0 0 13px' );
}
    
       
      function changeColor(){
        colorNum++;
        
        if (colorNum == 1){
            cColor = "green";
        }else if (colorNum == 2){
            cColor = "orange";
        }else if (colorNum == 3){
            cColor = "pink";
        }else if (colorNum == 4){
            cColor = "blue";
            colorNum = 0;
        }
        
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

// random between 1 and 2
/*<script>
function myFunction() {
    var x = document.getElementById("demo")
    x.innerHTML = Math.floor((Math.random() * 2) + 1);
}
</script>*/


