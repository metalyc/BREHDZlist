const Swal = require('sweetalert2');

function registration_alert() {
    var form = document.getElementById('registration_form');
    setTimeout(function () {
        form.submit();
    }, 5000);
    if (form.checkValidity() != false) {
        Swal.fire({
            title: "Checking over your credentials!",
            type: "success",
            showConfirmButton: false,
            timer: 2000,
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Please fill out all the fields correctly!",
            type: "error",
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function login_alert() {
    var form = document.getElementById('login_form');
    setTimeout(function () {
        form.submit();
    }, 5000);
    if (form.checkValidity() != false) {
        Swal.fire({
            title: "Checking over your credentials!",
            type: "success",
            showConfirmButton: false,
            timer: 2000,
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Please fill out all the fields correctly!",
            type: "error",
            showConfirmButton: false,
            timer: 1500
        });
    }
}