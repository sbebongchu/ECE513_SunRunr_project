function sendRegisterRequest() {
    let email = $('#email').val();
    let password = $('#password').val();
    let fullName = $('#fullName').val();
    let passwordConfirm = $('#passwordConfirm').val();

    // Check to make sure the passwords match
    // FIXME: Check to ensure strong password 
    if (password != passwordConfirm) {
        $('#ServerResponse').html("<span class='red-text text-darken-2'>Passwords do not match.</span>");
        $('#ServerResponse').show();
        return;
    }

    $.ajax({
            url: 'http://ec2-13-58-224-26.us-east-2.compute.amazonaws.com:3000/users/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email, fullName: fullName, password: password }),
            dataType: 'json'
        })
        .done(registerSuccess)
        .fail(registerError);
}

function registerSuccess(data, textStatus, jqXHR) {
    if (data.success) {
        window.location = "index.html";
    } else {
        $('#ServerResponse').html("<span class='red-text text-darken-2'>Error: " + data.message + "</span>");
        $('#ServerResponse').show();
    }
}

function registerError(jqXHR, textStatus, errorThrown) {
    if (jqXHR.statusCode == 404) {
        $('#ServerResponse').html("<span class='red-text text-darken-2'>Server could not be reached.</p>");
        $('#ServerResponse').show();
    } else {
        $('#ServerResponse').html("<span class='red-text text-darken-2'>Error: " + jqXHR.responseJSON.message + "</span>");
        $('#ServerResponse').show();
    }
}

function signinInfo() {
    $("#error2").hide()
    let password = $('#password').val();
    let passwordConfirm = $("passwordConfirm").val();
    let fullname = $("#fullName").val();
    let email = $("#email").val();

    let re1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/
    let re2 = /[a-z]+/;
    let re3 = /[A-Z]+/;
    let re4 = /\d+/;
    let info = "<ul class='collection with-header'>"

    if ((fullname.length) < 1) {
        info += "<li>Missing full name. </li>";

    }
    if (re1.exec(email) === null) {

        info += "<li>Invalid or missing email address.</li>";

    }
    if (password.length < 8 || password.length > 20) {
        info += "<li class='collection-item'> Password must be at least 8 characters</li>"
    }
    if (re2.exec(password) === null) {
        info += "<li class='collection-item'> Password must contain at least one lowercase character</li>"
    }
    if (re3.exec(password) === null) {
        info += "<li class='collection-item'> Password must contain at least one uppercase character</li>"
    }
    if (re4.exec(password) === null) {
        info += "<li class='collection-item'> Password must contain at least one digit character</li>"
    }
    if (info.length > 25) {
        $("#error2").html(info + "</ul>")
        $("#error2").show()
    }
    if (password !== passwordConfirm) {

        info += "<li>Password and confirmation password don't match.</li>";

    } else {
        sendRegisterRequest()
    }
}
$(function() {
    $('#signup').click(signinInfo);
});