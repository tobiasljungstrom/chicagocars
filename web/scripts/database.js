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

