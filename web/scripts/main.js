//Global variables
var customerURL = "http://localhost:8080/api/customers/";
var carURL = "http://localhost:8080/api/cars/";
var appointmentURL = "http://localhost:8080/api/appointments/";

$('document').ready(function() {

    //Page preparation
    clearAllActivePages();
    activateCustomerPage();

    //Forms
    $('#newCustomerForm').on("submit", function(e) {
        e.preventDefault();

        var formData = $(this).serializeObject();

        var address = {
            "street": formData.street,
            "postcode": formData.postcode,
            "city": formData.city
        };

        var body = {
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "email": formData.email,
            "address": address
        }

        body = JSON.stringify(body);

        submitData(body, customerURL);
    });
});

function submitData(body, url) {
console.log("Submitting data: " + body);

    $.ajax(url, {
        type: "POST",
        contentType: "application/json",
        data: body
    });
}

function activateCustomerPage() {
    console.log("Activating customers page");

    clearAllActivePages();
    $('#customersPanel').show();
    $('#navButtonCustomers').addClass('active');
}

function activateCarsPage() {
    console.log("Activating cars page");

    clearAllActivePages();
    $('#carsPanel').show();
    $('#navButtonCars').addClass('active');
}

function activateAppointmentsPage() {
    console.log("Activating appointments page");

    clearAllActivePages();
    $('#appointmentsPanel').show();
    $('#navButtonAppointments').addClass('active');
}

function clearAllActivePages() {
    $('nav li').removeClass('active');
    $('.contentPanel').hide();
}

//Function to create a JSON object out of a form
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
