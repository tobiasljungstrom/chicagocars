//Global variables
var customerURL = "http://localhost:8080/api/customers/";
var carURL = "http://localhost:8080/api/cars/";
var appointmentURL = "http://localhost:8080/api/appointments/";
var TIMEZONE = "+0200";

var statusCodeOK = 1;

$('document').ready(function () {

    //Page preparation
    clearAllActivePages();
    hideAllAlerts();
    populateCustomerLists();
    activateCustomerPage();

    //Forms
    $('#newCustomerForm').on("submit", function (e) {
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
        };

        body = JSON.stringify(body);

        submitData(body, customerURL);
    });

    $('#newCarForm').on("submit", function (e) {
        e.preventDefault();

        var formData = $(this).serializeObject();

        var body = {
            "licenseNumber": formData.licenseNumber,
            "manufacturer": formData.manufacturer,
            "model": formData.model,
            "owner": {"id": formData.carOwner}
        };

        body = JSON.stringify(body);

        submitData(body, carURL);
    });

    $('#newAppointmentForm').on("submit", function (e) {

        e.preventDefault();

        var formData = $(this).serializeObject();

        var body = {
            "date":formData.date + "T" + formData.time + ":00.000" + TIMEZONE,
            "customer": {"id": formData.appointmentOwner},
            "notes": formData.notes
        };

        body = JSON.stringify(body);

        submitData(body, appointmentURL);

    });
});

function populateCustomerLists() {
    var allCustomers = getData(customerURL + "all");

    for (i = 0; i < allCustomers.length; i++) {
        var currentId = allCustomers[i].id;
        var currentName = allCustomers[i].firstName + " " + allCustomers[i].lastName;

        $('#carOwnerSelector').append("<option value='" + currentId + "'>[" + currentId + "] " + currentName + "</option>");
        $('#appointmentOwnerSelector').append("<option value='" + currentId + "'>[" + currentId + "] " + currentName + "</option>");
    }
}

function submitData(body, url) {
    console.log("Submitting data: " + body);

    $.ajax(url, {
        type: "POST",
        contentType: "application/json",
        data: body,
        success: function () {
            showAlert(statusCodeOK);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showAlert(jqXHR.status);
        }
    });
}

function getData(url) {
    console.log("Retrieving data...");

    var returnData;

    $.ajax(url, {
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
            console.log("GET Success");
            returnData = data;
        },
        complete: function (jqXHR, textStatus) {
            console.log("GET Complete");
        }
    });

    return returnData;
}

function showAlert(statusCode) {
    if (statusCode === statusCodeOK) {
        $('.modal-footer .alert').html("Success!").addClass('alert-success').fadeIn();
    } else {
        $('.modal-footer .alert').html("Error! Code: " + statusCode).addClass('alert-danger').fadeIn();
    }

}

function activateCustomerPage() {
    console.log("Activating customers page");

    clearAllActivePages();
    hideAllAlerts();
    $('#customersPanel').show();
    $('#navButtonCustomers').addClass('active');
}

function activateCarsPage() {
    console.log("Activating cars page");

    clearAllActivePages();
    hideAllAlerts();
    $('#carsPanel').show();
    $('#navButtonCars').addClass('active');
}

function activateAppointmentsPage() {
    console.log("Activating appointments page");

    clearAllActivePages();
    hideAllAlerts();
    $('#appointmentsPanel').show();
    $('#navButtonAppointments').addClass('active');
}

function hideAllAlerts() {
    $('.alert').hide();
}

function clearAllActivePages() {
    $('nav li').removeClass('active');
    $('.contentPanel').hide();
}

//Function to create a JSON object out of a form
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
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
