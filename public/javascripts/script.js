console.log("works");

$(document).ready(function() {
    $.ajax({
        url: 'https://tonality.herokuapp.com/userlist',
        dataType: "text",
        jsonpCallback: "_testcb",
        cache: false,
        timeout: 5000,
        success: function(data) {
            alert(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});