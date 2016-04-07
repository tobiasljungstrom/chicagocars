/* MAIN.JS */

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
    resetForms();
    populateCustomerLists();
    activateCustomerPage();

    $("#newcustomerform").on("submit", function(e) {
        e.preventDefault();
    });
    $("#newCarForm").on("submit", function(e) {
        e.preventDefault();
    });
    $("#newAppointmentForm").on("submit", function(e) {
        e.preventDefault();
    });


});

function submitCustomer(id) {
    console.log("Submitting customer with id " + id);

    var formData = $('#newCustomerForm').serializeObject();

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

    if(id == null) {
        submitData(body, customerURL);
    } else {
        updateData(body, customerURL, id);
    }
}

function submitCar(id) {
    console.log("Submitting car with id " + id);

    var formData = $('#newCarForm').serializeObject();

    var body = {
        "licenseNumber": formData.licenseNumber,
        "manufacturer": formData.manufacturer,
        "model": formData.model,
        "owner": {"id": formData.carOwner}
    };

    body = JSON.stringify(body);

    if(id == null) {
        submitData(body, carURL);
    } else {
        updateData(body, carURL, id);
    }
}

function submitAppointment(id) {
    console.log("Submitting appointment with id " + id);

    var formData = $('#newAppointmentForm').serializeObject();

    var body = {
        "date": formData.date + "T" + formData.time + ":00.000" + TIMEZONE,
        "customer": {"id": formData.appointmentOwner},
        "notes": formData.notes
    };

    body = JSON.stringify(body);
    console.log(body);

    if(id == null) {
        submitData(body, appointmentURL);
        console.log("null");
    } else {
        updateData(body, appointmentURL, id);
        console.log("UpdateData: " + body + " - " + appointmentURL + id);
    }
}

function extractAddress(address) {
    return address.split(", ");

}

function truncateToYear(date) {
    return date.substr(0, 10);
}
function truncateToTime(date) {
    console.log(date.substr(11, 15));
    return date.substr(11, 15);
}
function activateEditModal(dataType, id) {

    console.log("Editing " + dataType + " " + id);
    
    var modal;
    
    if (dataType == "customer") {
        
        modal = $("#newCustomerModal");
        
        var currentCustomer = getData(customerURL + id);

        var currentAddress = extractAddress(currentCustomer.address);
        
        modal.find("[name='firstName']").attr("value", currentCustomer.firstName);
        modal.find("[name='lastName']").attr("value", currentCustomer.lastName);
        modal.find("[name='email']").attr("value", currentCustomer.email);
        modal.find("[name='street']").attr("value", currentAddress[0]);
        modal.find("[name='postcode']").attr("value", currentAddress[1]);
        modal.find("[name='city']").attr("value", currentAddress[2]);

        modal.find("#submitCustomerButton").attr("onclick", "submitCustomer(" + currentCustomer.id + ")");
        
    } else if (dataType == "car") {
        modal = $("#newCarModal");

        var currentCar = getData(carURL + id);

        modal.find("[name='licenseNumber']").attr("value", currentCar.licenseNumber);
        modal.find("[name='manufacturer']").attr("value", currentCar.manufacturer);
        modal.find("[name='model']").attr("value", currentCar.model);
        modal.find("option[value='" + currentCar.owner.id + "']").attr("selected", "selected");

        modal.find("#submitCarButton").attr("onclick", "submitCar(" + currentCar.id + ")");
    } else if (dataType == "appointment") {
        modal = $("#newAppointmentModal");

        var currentAppointment = getData(appointmentURL + id);

        modal.find("[name='date']").attr("value", truncateToYear(currentAppointment.date));
        modal.find("option[value='" + currentAppointment.customer.id + "']").attr("selected", "selected");
        modal.find("option[value='" + truncateToTime(currentAppointment.date) + "']").attr("selected", "selected");
        modal.find("[name='notes']").html(currentAppointment.notes);

        modal.find("#submitAppointmentButton").attr("onclick", "submitAppointment(" + currentAppointment.id + ")");
    }

    modal.find("[type='submit']").html("Update");
    modal.find(".modal-title").html("Update " + dataType);


    $('#inspectionModal').modal("hide");
    modal.modal("show");

}

function buildCustomerInspectionModal(modal, customer) {
    modal.find(".modal-title").html("<img src='images/customer.png'><span class='inspectionTitle'>Customer</span>");

    var carList = customer.cars;
    var appointmentList = customer.appointments;

    var carListStrings = "";
    var appointmentListStrings = "";

    if (carList.length < 1) {
        carListStrings = "No Cars";
    } else {
        for (var i = 0; i < carList.length; i++) {
            carListStrings += "<p onclick='showInspectionModal(\"car\"," + carList[i].substr(0, 1) + ")'><a>" + carList[i] + "</a></p>";
        }
    }

    if (appointmentList.length < 1) {
        appointmentListStrings = "No appointments";
    } else {
        for (var i = 0; i < appointmentList.length; i++) {
            appointmentListStrings += "<p onclick='showInspectionModal(\"appointment\"," + appointmentList[i].substr(0, 1) + ")'><a>" + appointmentList[i] + "</a></p>";
        }
    }

    modal.find(".inspectionModalBody").html(
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

    modal.find("#inspectionDeleteButton").attr("onclick", "doDelete(\"customer\", " + customer.id + ")");

    modal.find("#inspectionEditButton").attr("onclick", "activateEditModal(\"customer\", " + customer.id + ")");
}

function buildCarInspectionModal(modal, car) {
    modal.find(".modal-title").html("<img src='images/car.png'><span class='inspectionTitle'>Car</span>");

    modal.find(".inspectionModalBody").html(
        "<div><h2>" + car.manufacturer + " " + car.model + "</h2></div>" +
        "<div><h3>License Number: " + car.licenseNumber + "</h3></div>" +
        "<div onclick='showInspectionModal(\"customer\"," + car.owner.id + ")'><h4>Owner: <a>" + car.owner.firstName + " " + car.owner.lastName + "</a></h4></div>"
    );

    modal.find("#inspectionDeleteButton").attr("onclick", "doDelete(\"car\", " + car.id + ")");

    modal.find("#inspectionEditButton").attr("onclick", "activateEditModal(\"car\", " + car.id + ")");
}

function buildAppointmentInspectionModal(modal, appointment) {
    modal.find(".modal-title").html("<img src='images/appointment.png'><span class='inspectionTitle'>Appointment</span>");

    modal.find(".inspectionModalBody").html(
        "<div><h2>" + appointment.date + "</h2></div>" +
        "<div onclick='showInspectionModal(\"customer\"," + appointment.customer.id + ")'><h3>Customer: <a>" + appointment.customer.firstName + " " + appointment.customer.lastName + "</a></h3></div>" +
        "<div class='well'>" +
        "<div><h4>Notes</h4></div>" +
        "<div>" + appointment.notes + "</div>" +
        "</div>"
    );

    modal.find("#inspectionDeleteButton").attr("onclick", "doDelete(\"appointment\", " + appointment.id + ")");

    modal.find("#inspectionEditButton").attr("onclick", "activateEditModal(\"appointment\", " + appointment.id + ")");
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

        buildAppointmentInspectionModal(modal, dataObject);
    }

    hideAllAlerts();

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
    console.log("Refreshing tables...")
    populateCustomerTable();
    populateCarsTable();
    populateAppointmentsTable();
}

function resetForms() {
    $('form').trigger("reset");
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

function updateData(body, url, id) {
    console.log("Updating data with id " + id + ": " + body);

    var updateUrl = url + id;
    console.log(body);
    console.log (updateUrl);

    $.ajax(updateUrl, {
        type: "PUT",
        contentType: "application/json",
        data: body,
        success: function () {
            showAlert(statusCodeOK);
            refreshTables();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showAlert(jqXHR.status);
        }
    });
}

function getData(url) {
    console.log("Retrieving data...");

    var returnData = {};

    $.ajax(url, {
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data, textStatus, jqXHR) {
            returnData = data;
        },
        complete: function (jqXHR, textStatus) {
        }
    });

    return returnData;
}

function doDelete(dataType, id) {
    console.log("Deleting " + dataType + " with id " + id);

    var deleteUrl = "";

    if (dataType == "customer") {
        deleteUrl = customerURL + id;
    } else if (dataType == "car") {
        deleteUrl = carURL + id;
    } else if (dataType == "appointment") {
        deleteUrl = appointmentURL + id;
    } else {
        deleteUrl = "Invalid Data Type";
    }

    $.ajax(deleteUrl, {
        type: "DELETE",
        url: deleteUrl,
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

function showAlert(statusCode) {

    var alert = $('.modal-footer .alert');

    alert.removeClass('alert-success');
    alert.removeClass('alert-danger');

    if (statusCode === statusCodeOK) {
        alert.html("Success!").addClass('alert-success').fadeIn();
    } else {
        alert.html("Error! Code: " + statusCode).addClass('alert-danger').fadeIn();
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

function activateStatsPage() {
    console.log("Activating stats page");

    clearAllActivePages();
    hideAllAlerts();
    $('#statsPanel').show();
    $('#navButtonStats').addClass('active');

    loadStats();
    displayStats();
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
