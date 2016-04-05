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
    resetForms()
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
            "date": formData.date + "T" + formData.time + ":00.000" + TIMEZONE,
            "customer": {"id": formData.appointmentOwner},
            "notes": formData.notes
        };

        body = JSON.stringify(body);

        submitData(body, appointmentURL);

    });


});

function buildCustomerInspectionModal(modal, customer) {
    modal.find(".modal-title").html("Customer");

    var carList = customer.cars;
    var appointmentList = customer.appointments;

    var carListStrings = "";
    var appointmentListStrings = "";

    if (carList.length < 1) {
        carListStrings = "No Cars";
    } else {
        for (var i = 0; i < carList.length; i++) {
            carListStrings += "<p>" + carList[i] + "</p>";
        }
    }

    if (appointmentList.length < 1) {
        appointmentListStrings = "No appointments";
    } else {
        for (var i = 0; i < appointmentList.length; i++) {
            appointmentListStrings += "<p>" + appointmentList[i] + "</p>";
        }
    }

    modal.find(".modal-body").html(
        "<div><h2>" + customer.firstName + " " + customer.lastName + "</h2></div>" +
        "<div><h4>Customer id: " + customer.id + "</h4></div>" +
        "<div><h3>" + customer.address + "</h3></div>" +
        "<div class='well'>" +
        "<div><h4>Cars</h4></div>" +
        "<div>" + carListStrings + "</div>" +
        "</div><div class='well'>" +
        "<div><h4>Appointments</h4></div>" +
        "<div>" + appointmentListStrings + "</div>" +
        "</div>"
    );
}

function buildCarInspectionModal(modal, car) {
    modal.find(".modal-title").html("Car");

    modal.find(".modal-body").html(
        "<div><h2>" + car.manufacturer + " " + car.model + "</h2></div>" +
        "<div><h3>License Number: " + car.licenseNumber + "</h3></div>" +
        "<div onclick='showInspectionModal(\"customer\"," + car.owner.id + ")'><h4>Owner: " + car.owner.firstName + " " + car.owner.lastName + "</h4></div>"
    );
}

function buildAppointmentInspectionModal(modal, appointment) {
    modal.find(".modal-title").html("Appointment");

    modal.find(".modal-body").html(
        "<div><h2>" + appointment.date + "</h2></div>" +
        "<div><h3>Customer: " + appointment.customer.firstName + " " + appointment.customer.lastName + "</h3></div>" +
        "<div class='well'>" +
        "<div><h4>Notes</h4></div>" +
        "<div>" + appointment.notes + "</div>" +
        "</div>"
    );
}

function showInspectionModal(dataType, id) {
    var modal = $('#inspectionModal');

    var dataObject;

    if (dataType == "customer") {
        console.log("Customer to display");
        dataObject = getData(customerURL + id);

        buildCustomerInspectionModal(modal, dataObject);

    } else if (dataType == "car") {
        console.log("Car to display");
        dataObject = getData(carURL + id);

        buildCarInspectionModal(modal, dataObject);

    } else if (dataType == "appointment") {
        console.log("Appointment to display");
        dataObject = getData(appointmentURL + id);

        console.log(dataObject);

        buildAppointmentInspectionModal(modal, dataObject);
    }

    modal.modal("show");
}

function makeTableRowsHoverable() {
    $('.customerTableRow').click(function () {
            console.log("Clicked row " + $(this).data("id"));
        })
        .mouseover(function () {
            $(this).addClass("activeRow");
        })
        .mouseleave(function () {
            $(this).removeClass("activeRow");
        });

    $('.carsTableRow').click(function () {
            console.log("Clicked row " + $(this).data("id"));
        })
        .mouseover(function () {
            $(this).addClass("activeRow");
        })
        .mouseleave(function () {
            $(this).removeClass("activeRow");
        });

    $('.appointmentsTableRow').click(function () {
            console.log("Clicked row " + $(this).data("id"));
        })
        .mouseover(function () {
            $(this).addClass("activeRow");
        })
        .mouseleave(function () {
            $(this).removeClass("activeRow");
        });
}

function populateCustomerLists() {
    var allCustomers = getData(customerURL + "all");

    for (i = 0; i < allCustomers.length; i++) {
        var currentId = allCustomers[i].id;
        var currentName = allCustomers[i].firstName + " " + allCustomers[i].lastName;

        $('#carOwnerSelector').append("<option value='" + currentId + "'>[" + currentId + "] " + currentName + "</option>");
        $('#appointmentOwnerSelector').append("<option value='" + currentId + "'>[" + currentId + "] " + currentName + "</option>");
    }
}

function refreshTables() {
    populateCustomerTable();
    populateCarsTable();
    populateAppointmentsTable();
}

function resetForms() {
    $('#customerDisplayTable').trigger("reset");
    $('#carsDisplayTable').trigger("reset");
    $('#appointmentsDisplayTable').trigger("reset");
}

function submitData(body, url) {
    console.log("Submitting data: " + body);

    $.ajax(url, {
        type: "POST",
        contentType: "application/json",
        data: body,
        success: function () {
            showAlert(statusCodeOK);
            refreshTables();
            resetForms();
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

function populateCustomerTable() {
    var allCustomers = getData(customerURL + "all");
    var tableBody = $("#customerDisplayTable").find("tbody");

    tableBody.html(""); //Clear the table to prevent duplicate entries

    for (i = 0; i < allCustomers.length; i++) {
        tableBody.append(
            "<tr class='customerTableRow' data-id='" + allCustomers[i].id + "' onclick='showInspectionModal(\"customer\", " + allCustomers[i].id + ")'>" +
            "<td>" + allCustomers[i].id + "</td>" +
            "<td>" + allCustomers[i].firstName + " " + allCustomers[i].lastName + "</td>" +
            "<td>" + allCustomers[i].email + "</td>" +
            "<td>" + allCustomers[i].address + "</td>" +
            "</tr>"
        )
    }
    makeTableRowsHoverable();
}

function activateCustomerPage() {
    console.log("Activating customers page");

    clearAllActivePages();
    hideAllAlerts();
    populateCustomerTable();
    $('#customersPanel').show();
    $('#navButtonCustomers').addClass('active');
}

function populateCarsTable() {
    var allCars = getData(carURL + "all");
    var tableBody = $("#carsDisplayTable").find("tbody");

    tableBody.html(""); //Clear the table to prevent duplicate entries

    for (i = 0; i < allCars.length; i++) {
        tableBody.append(
            "<tr class='carsTableRow' data-id='" + allCars[i].id + "' onclick='showInspectionModal(\"car\", " + allCars[i].id + ")'>" +
            "<td>" + allCars[i].licenseNumber + "</td>" +
            "<td>" + allCars[i].manufacturer + "</td>" +
            "<td>" + allCars[i].model + "</td>" +
            "<td>" + "[" + allCars[i].owner.id + "] " + allCars[i].owner.firstName + " " + allCars[i].owner.lastName + "</td>" +
            "</tr>"
        )
    }
    makeTableRowsHoverable();
}

function activateCarsPage() {
    console.log("Activating cars page");

    clearAllActivePages();
    hideAllAlerts();
    populateCarsTable();
    $('#carsPanel').show();
    $('#navButtonCars').addClass('active');
}

function limitText(text, limit) {
    if (text.length > limit) {
        text = text.substr(0, limit);
        text = text + "...";
    }
    return text;
}

function populateAppointmentsTable() {
    var allAppointments = getData(appointmentURL + "all");
    var tableBody = $("#appointmentsDisplayTable").find("tbody");

    tableBody.html(""); //Clear the table to prevent duplicate entries

    for (i = 0; i < allAppointments.length; i++) {
        tableBody.append(
            "<tr class='appointmentsTableRow' data-id='" + allAppointments[i].id + "' onclick='showInspectionModal(\"appointment\", " + allAppointments[i].id + ")'>" +
            "<td>" + allAppointments[i].date + "</td>" +
            "<td>" + "[" + allAppointments[i].customer.id + "] " + allAppointments[i].customer.firstName + " " + allAppointments[i].customer.lastName + "</td>" +
            "<td>" + limitText(allAppointments[i].notes, 80) + "</td>" +
            "</tr>"
        )
    }

    makeTableRowsHoverable();
}

function activateAppointmentsPage() {
    console.log("Activating appointments page");

    clearAllActivePages();
    hideAllAlerts();
    populateAppointmentsTable();
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
