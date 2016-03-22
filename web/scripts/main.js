$('document').ready(function(){

    //Page preparation
    clearAllActivePages();
    activateCustomerPage();

});

function activateCustomerPage(){
    console.log("Activating customers page");

    clearAllActivePages();
    $('#customersPanel').show();
    $('#navButtonCustomers').addClass('active');
}

function activateCarsPage(){
    console.log("Activating cars page");

    clearAllActivePages();
    $('#carsPanel').show();
    $('#navButtonCars').addClass('active');
}

function activateAppointmentsPage(){
    console.log("Activating appointments page");

    clearAllActivePages();
    $('#appointmentsPanel').show();
    $('#navButtonAppointments').addClass('active');
}

function clearAllActivePages() {
    $('nav li').removeClass('active');
    $('.contentPanel').hide();
}
