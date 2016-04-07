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

    var allCities = createCitiesArray();
    var sortedCities = sortAndGroup(allCities);

    displayCityStats(sortedCities);

    $("#totalCustomers").html(allCustomers.length);
    $("#totalCars").html(allCars.length);
    $("#totalAppointments").html(allAppointments.length);
}

function displayCityStats(sortedCities) {

    for (var i = 0; i < sortedCities[0].length; i++) {
        $("#cityStatsTable").find("tbody").append("<tr><td>" + sortedCities[0][i] +
            "</td><td>" + sortedCities[1][i] +
            "</td></tr>")
    }
}

function createCitiesArray() {
    var returnArray = [];

    for (var i = 0; i < allCustomers.length; i++) {
        var city = extractAddress(allCustomers[i].address);
        returnArray.push(city[2]);
    }

    return returnArray;
}

function sortAndGroup(stringArray) {

    var names = [];
    var count = [];

    stringArray.sort();

    for (var i = 0; i < stringArray.length; i++) {
        if (stringArray[i] !== stringArray[i - 1]) {
            names.push(stringArray[i]);
            count.push(1);
        } else {
            count[count.length - 1]++;
        }
    }

    return [names, count];
}

/*
function existsInArray(array, value) {
    for (var i = 0; i < array.length; i++) {
        if( array[i].match(value)) {
            return true;
        } else {
            return false;
        }
    }
}*/