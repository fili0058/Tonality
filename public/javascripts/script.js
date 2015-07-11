$(document).ready(function() {

if (Modernizr.touch){
    $(".controls").css('display', 'none');
} else {
    $(".colorSquares, .arrows").css('display', 'none');
}    
    
    
//---------Important Global Variables----------
    
var light = true;    
    
var dragging = false;
    
$("body").on("touchmove", function(){
  dragging = true;
});    
    
$("body").on("touchend", function(){
    dragging = false;
    
    clearInterval(leftKey);
    leftOn = 1;
    $(".leftA").css('border-right', '5.3vw solid rgba(0,0,0,0.5)');
    clearInterval(upKey);
    upOn = 1;
    $(".upA").css('border-bottom', '5.3vw solid rgba(0,0,0,0.5)');
    clearInterval(rightKey);
    rightOn = 1;
    $(".rightA").css('border-left', '5.3vw solid rgba(0,0,0,0.5)');
    clearInterval(downKey);
    downOn = 1;
    $(".downA").css('border-top', '5.3vw solid rgba(0,0,0,0.5)');

});
    
//Current Row and Column ie position    
var cRow = 15;
var cCol = 15;
    
//current color    
var cColor = "blue";
    
//hue value
var cColorNum = 196;
    
//randomly selects a color to start
var colorNum = Math.floor((Math.random() * 4) + 1);
    //function that updates the color
    changeColor();

//influence: true = light   false = dark
var influence = true;


//refreshes the players color    
refreshLocal(); 
                        //refreshes the entire grid by calling to the node app which finds all the info from the database
                        $.ajax({ 
                                //url: 'http://localhost:5000/refresh',
                                url: 'http://tonality.herokuapp.com/refresh',

                                   type: 'POST',
                                   cache: false, 
                                    dataType: "json",
                                           success: function(data){
                                                var test = data['usercollection'];
                                                for (var i = 0; i<900; i++){    
                                                var test2 = test[i];

                                                 if (test2['row'] == cRow && test2['col'] == cCol){
                                                //do nothing - do not refresh the player's square
                                                 }else{

                                                $("section:nth-of-type(" + test2['row'] + ") div:nth-of-type(" + test2['col'] + ")").css("background-color", "hsl(" + test2['hue'] + ", 60%, " + test2['lum'] + "%)");

                                                     }
                                                 }



                                           }, error: function(jqXHR, textStatus, err){
                                               alert('text status '+textStatus+', err '+err)
                                           }
                                })
    //variables 'key' allow me to reset use the keyup method
    //variables 'On' allow me to make the action happen only once before the 'setinterval' kicks in
    var leftKey;  
    var leftOn = 1;   
    var rightKey;  
    var rightOn = 1; 
    var upKey;  
    var upOn = 1; 
    var downKey;  
    var downOn = 1; 
    
    //all arrow keys are roughly the same - they check if the key is being pressed for the first time
    //then check if the player has gone too far
    //on an interval of 100ms
    //they add or subtract the appropriate global variable to move the player
    //then call the function that refreshes the player color
    //then they clear the box shadow from the square they just came from
    //finally they call to the node app which modifies the database
    $(document).keydown(function(e)
    {
        // left arrow
        if (e.keyCode == 37) {
               
            if (leftOn == 1){
        
                leftOn++;
                //make the player move right away before the interval
                if (cCol > 1){
                    cCol--;
                    refreshLocal();
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("box-shadow", 'none' );
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("border-radius", 'initial' );
                    modifyDatabase();
                }
        
                leftKey = setInterval(function(){
                    if (cCol > 1){
                    cCol--;
                    refreshLocal();
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("box-shadow", 'none' );
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("border-radius", 'initial' );
                    modifyDatabase();
                    }
                
                }, 100);     
            }
        }   
        
        // up arrow
         if (e.keyCode == 38) { 
                
             if (upOn == 1){
                    upOn++;
                 
                    if (cRow > 1){              
                        cRow--;
                        refreshLocal();
                        $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                        $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("border-radius", 'initial' );
                        modifyDatabase();
                    }
                    upKey = setInterval(function(){
                    
                        if (cRow > 1){
                            cRow--;
                            refreshLocal();
                            $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                            $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("border-radius", 'initial' );
                            modifyDatabase();
                        }
                    }, 100); 
             }
        }   
        
         // right arrow
         if (e.keyCode == 39) { 
            
            if (rightOn == 1){
                 rightOn++;
                
                if (cCol < 30){
                    cCol++;
                    refreshLocal();
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol - 1) + ')').css("box-shadow", 'none' );
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol -1) + ')').css("border-radius", 'initial' );
                    modifyDatabase();
                }
             
                rightKey = setInterval(function(){     
                    
                    if (cCol < 30){
                        cCol++;
                        refreshLocal();
                        $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol - 1) + ')').css("box-shadow", 'none' );
                        $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol - 1) + ')').css("border-radius", 'initial' );
                        modifyDatabase();
                    }
                }, 100); 
            }
         }  
        
        // down arrow
        if (e.keyCode == 40) { 
              
            if (downOn == 1){
                    downOn++;         
                    
                    if (cRow < 30){
                        cRow++;
                        refreshLocal();
                        $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                        $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("border-radius", 'initial' );
                        modifyDatabase();   
                    }
                          
                    downKey = setInterval(function(){      
                        if (cRow < 30){
                            cRow++;
                            refreshLocal();
                            $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                            $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("border-radius", 'initial' );
                            modifyDatabase();   
                        }
                    }, 100);  
            }
        }  
        
        //spacebar
        if (e.keyCode == 32) {
            colorNum++;
               changeColor();
               refreshLocal();
        }
        
        //enter
        if (e.keyCode == 13) { 
                     
             if (influence == true){
                    influence = false;
                    $("body").css("color", "white");
                    $(".light").css("opacity", 0);
                    $(".dark").css("opacity", 100);
                 $(".darkLight").css('background-color', 'rgba(0,0,0,0.5)');
                light = false;
             }else{
                    influence = true;
                    $("body").css("color", "black");
                    $(".light").css("opacity", 100);
                    $(".dark").css("opacity", 0);
                 $(".darkLight").css('background-color', 'rgba(255,255,255,0.5)');
                 light = true;                
             }
        }
        
        // press 0 to create a fully blue grid 
        /*if (e.keyCode == 48) { console.log("new grid"); 

                        $.ajax({
                                url: 'http://localhost:5000/newgrid',
                               // url: 'http://tonality.herokuapp.com/newgrid',
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
    
    
    $(document).keyup(function(e)
    {
        // left arrow
        if (e.keyCode == 37) {
            clearInterval(leftKey);
            leftOn = 1;
        }
    
        //up
        if (e.keyCode == 38) { 
            clearInterval(upKey);
            upOn = 1;
        }
        //right
         if (e.keyCode == 39) { 
             clearInterval(rightKey);
            rightOn = 1;
         }
             //down
         if (e.keyCode == 40) { 
             clearInterval(downKey);
            downOn = 1;
         }
    });
    
    
    $(".leftA").on("touchstart", function(){
      if (dragging)
      return;
      //button action code
        $(".leftA").css('border-right', '5.3vw solid rgba(255,255,255,0.5)');
        
        if (leftOn == 1){
        
                leftOn++;
                //make the player move right away before the interval
                if (cCol > 1){
                    cCol--;
                    refreshLocal();
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("box-shadow", 'none' );
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("border-radius", 'initial' );
                    modifyDatabase();
                }
        
                leftKey = setInterval(function(){
                    if (cCol > 1){
                    cCol--;
                    refreshLocal();
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("box-shadow", 'none' );
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol + 1) + ')').css("border-radius", 'initial' );
                    modifyDatabase();
                    }
                
                }, 100);     
            }
        });
    
    $(".rightA").on("touchstart", function(){
      if (dragging)
      return;
      //button action code
        $(".rightA").css('border-left', '5.3vw solid rgba(255,255,255,0.5)');
        
    if (rightOn == 1){
                 rightOn++;
                
                if (cCol < 30){
                    cCol++;
                    refreshLocal();
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol - 1) + ')').css("box-shadow", 'none' );
                    $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol - 1) + ')').css("border-radius", 'initial' );
                    modifyDatabase();
                }
             
                rightKey = setInterval(function(){     
                    
                    if (cCol < 30){
                        cCol++;
                        refreshLocal();
                        $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol - 1) + ')').css("box-shadow", 'none' );
                        $('section:nth-of-type(' + cRow + ') div:nth-of-type(' + (cCol -1) + ')').css("border-radius", 'initial' );
                        modifyDatabase();
                    }
                }, 100); 
            }     
    });

        
    $(".upA").on("touchstart", function(){
      if (dragging)
      return;
      //button action code
        $(".upA").css('border-bottom', '5.3vw solid rgba(255,255,255,0.5)');
        
        if (upOn == 1){
                    upOn++;
                 
                    if (cRow > 1){              
                        cRow--;
                        refreshLocal();
                        $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                        $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("border-radius", 'initial' );
                        modifyDatabase();
                    }
                    upKey = setInterval(function(){
                    
                        if (cRow > 1){
                            cRow--;
                            refreshLocal();
                            $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                            $('section:nth-of-type(' + (cRow + 1) + ') div:nth-of-type(' + cCol + ')').css("border-radius", 'initial' );
                            modifyDatabase();
                        }
                    }, 100); 
             }
    });
    
    $(".downA").on("touchstart", function(){
      if (dragging)
      return;
      //button action code
        $(".downA").css('border-top', '5.3vw solid rgba(255,255,255,0.5)');
        
        if (downOn == 1){
                    downOn++;         
                    
                    if (cRow < 30){
                        cRow++;
                        refreshLocal();
                        $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                        $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("border-radius", 'initial' );
                        modifyDatabase();   
                    }
                          
                    downKey = setInterval(function(){      
                        if (cRow < 30){
                            cRow++;
                            refreshLocal();
                            $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("box-shadow", 'none' );
                            $('section:nth-of-type(' + (cRow - 1) + ') div:nth-of-type(' + cCol + ')').css("border-radius", 'initial' );
                            modifyDatabase();   
                        }
                    }, 100);  
            }
    });
    
     $(".darkLight").on("touchstart", function(){
      
        if (light == true){ 
        $(".darkLight").css('background-color', 'rgba(0,0,0,0.5)');
        light = false;
        }else{
        $(".darkLight").css('background-color', 'rgba(255,255,255,0.5)');
        light = true;
        }
         
        if (influence == true){
                    influence = false;
                    $("body").css("color", "white");
                    $(".light").css("opacity", 0);
                    $(".dark").css("opacity", 100);
             }else{
                    influence = true;
                    $("body").css("color", "black");
                    $(".light").css("opacity", 100);
                    $(".dark").css("opacity", 0);
        }
     });
    
    
    $(".greenS").on("touchstart", function(){
        colorNum = 1;
        changeColor();
    });
    $(".orangeS").on("touchstart", function(){
        colorNum = 2;
        changeColor();
    });
    $(".purpleS").on("touchstart", function(){
        colorNum = 3;
        changeColor();
    });
     $(".blueS").on("touchstart", function(){
         colorNum = 4;
        changeColor();
     });
    
        function modifyDatabase(){
            
            $.ajax({ 
            //url: 'http://localhost:5000/modify',
            url: 'http://tonality.herokuapp.com/modify',

                       type: 'POST',
                       cache: false, 

                        dataType: "json",
                       data: { localRow: cRow, localCol: cCol, localHue: cColor, light: influence }, 
                               success: function(data){
                                   var test = data['usercollection'];

                                             for (var i = 0; i<900; i++){    
                                                var test2 = test[i];


                                                 if (test2['row'] == cRow && test2['col'] == cCol){

                                                 }else{

                                                $("section:nth-of-type(" + test2['row'] + ") div:nth-of-type(" + test2['col'] + ")").css("background-color", "hsl(" + test2['hue'] + ", 60%, " + test2['lum'] + "%)");

                                                 }
                                             }

                               }, error: function(jqXHR, textStatus, err){
                                   alert('text status '+textStatus+', err '+err)
                               }
                    })  
                }
  
    function refreshLocal(){
            $('section:nth-of-type(' + cRow+ ') div:nth-of-type(' + cCol + ')').css("background-color", 'hsl(' + cColorNum + ', 60%, 50%)').css("box-shadow", '0 0 13px' );
        $('section:nth-of-type(' + cRow+ ') div:nth-of-type(' + cCol + ')').css("border-radius", '50%' );
        //$('section:nth-of-type(' + cCol+ ') div').css("box-shadow", '0 0 13px' );
}
    
      function changeColor(){
        if(colorNum == 5){
            colorNum = 1;
        }
            $(".blueS").css('opacity', '0.5');
            $(".purpleS").css('opacity', '0.5');
            $(".orangeS").css('opacity', '0.5');
            $(".greenS").css('opacity', '0.5');
        
        if (colorNum == 1){
            cColor = "green";
            cColorNum = 164;
            $(".greenS").css('opacity', '1');
        }else if (colorNum == 2){
            cColor = "orange";
            cColorNum = 5;
            $(".orangeS").css('opacity', '1');
        }else if (colorNum == 3){
            cColor = "purple";
            cColorNum = 276;
            $(".purpleS").css('opacity', '1');
        }else if (colorNum == 4){
            cColor = "blue";
            cColorNum = 196;
            $(".blueS").css('opacity', '1');
        }
          $(".fullBG").css("background-color", "hsl(" + cColorNum + ", 60%, 50%)");
    }
    
    
});