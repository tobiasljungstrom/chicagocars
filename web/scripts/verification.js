var loginURL = "http://localhost:8080/api/login/";

function sendVerification(username, password) {



    var body = {"username":username,
    "password":password};

    body = JSON.stringify(body);

    console.log(body);
    
    $.ajax(loginURL, {
        type: "POST",
        contentType: "application/json",
        data: body,
        async: false,
        success: function () {
            console.log("Success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showAlert(jqXHR.status);
        }
    });
}

function verifyUser() {

    var returnValue = 0;

    $.ajax(loginURL, {
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
            returnValue = data.userId;
        },
        complete: function (jqXHR, textStatus) {
        }
    });

    return returnValue;
}

function logout(){
    sendVerification("0", "0");
    window.location = "index.html";
}