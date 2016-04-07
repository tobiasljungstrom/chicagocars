/* STATS.JS */

var allCustomers = [];
var allCars = [];
var allAppointments = [];

function loadStats() {
    console.log("Loading Stats");

    allCustomers = getData(customerURL + "all");
    allCars = getData(carURL + "all");
    allAppointments = getData(appointmentURL + "all");
}

function displayStats() {
    console.log("Displaying Stats");

    $("#totalCustomers").html(allCustomers.length);
    $("#totalCars").html(allCars.length);
    $("#totalAppointments").html(allAppointments.length);
}