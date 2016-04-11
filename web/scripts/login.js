$(document).ready(function(){
    $("#loginButton").click(function(){

        var username = $("#usernameInput").val();
        var password = $("#passwordInput").val();

        sendVerification(username, password)
    });

    $("#verifyButton").click(function(){

        var user = verifyUser();

        $("p").html(user);

    });
});
