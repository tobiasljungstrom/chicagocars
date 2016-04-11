var customerURL = "http://localhost:8080/api/customers/";
var customerId = verifyUser();

var customer = getData(customerURL + customerId);

$(document).ready(function(){
    $("p").html(
        "Hello " + customer.firstName
    );
});
