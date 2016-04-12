//Before anything, verify
var currentUserId = verifyUser();
if (currentUserId < 1) {
    window.location = "index.html";
}

var customerURL = "http://localhost:8080/api/customers/";
var customerId = verifyUser();

var currentUser = getData(customerURL + customerId);

$(document).ready(function () {

    $(".greeting h2").html(
        "Welcome, " + currentUser.firstName
    );

    var appointments = currentUser.appointments;
    console.log(appointments);

    for (var i = 0; i < appointments.length; i++) {
        $(".appointmentList ul").append(
            "<li>" + appointments[i].substr(0, 16) + "</li>"
        );
    }


});
