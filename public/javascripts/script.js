console.log("works");

$(document).ready(function() {

     setInterval(function()
            {
    $.ajax({
        url: 'http://localhost:5000/ajax',
        //url: 'http://tonality.herokuapp.com/ajax',
        dataType: "json",
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
         
      },1000);
         
    
    $(document).keydown(function(e)
    {
        // left arrow
         if (e.keyCode == 37) {
         
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
    
             
         }   
         if (e.keyCode == 38) { console.log("up"); }   // up arrow
         if (e.keyCode == 39) { console.log("right"); }   // right arrow
         if (e.keyCode == 40) { console.log("down"); }   // down arrow   
     });

    
    
});






