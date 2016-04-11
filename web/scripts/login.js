$(document).ready(function(){

    $(".alert").hide();

    $("#loginButton").click(function(){

        var username = $("#usernameInput").val();
        var password = $("#passwordInput").val();

        sendVerification(username, password)
    });

    $("form").on("submit", function(e){

        e.preventDefault();

        var user = verifyUser();
        
        if (user < 0) {
            window.location = "admin.html";
        } else if (user > 0) {
            window.location = "customer.html";
        } else {
            $(".alert").fadeIn();
        }

    });
});
