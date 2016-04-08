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
    displayDatabaseStats();

    displayMonthsStats();

}

function displayMonthsStats() {
    var countedMonths = getMonthsArray();
    var tableRow = $("#monthsStatsTable tbody tr");

    console.log(countedMonths);

    for (var i = 0; i < countedMonths.length; i++) {
        tableRow.append("<td>" + countedMonths[i] + "</td>");
    }

}

function getMonthsArray() {
    var countArray = [0,0,0,0,0,0,0,0,0,0,0,0];

    for (var i = 0; i < allAppointments.length; i++) {
        var currentMonth = allAppointments[i].date.substr(5, 2).valueOf() - 1;
        countArray[currentMonth]++;
    }

    return countArray;
}

function displayDatabaseStats() {
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

function sortAndGroup(itemArray) {

    var items = [];
    var count = [];

    itemArray.sort();

    for (var i = 0; i < itemArray.length; i++) {
        if (itemArray[i] !== itemArray[i - 1]) {
            items.push(itemArray[i]);
            count.push(1);
        } else {
            count[count.length - 1]++;
        }
    }

    return [items, count];
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