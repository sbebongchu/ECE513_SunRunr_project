var activityData = [];

function sendReqForAccountInfo() {
    $.ajax({
            url: 'http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/users/account',
            type: 'GET',
            headers: { 'x-auth': window.localStorage.getItem("authToken") },
            dataType: 'json'
        })
        .done(accountInfoSuccess)
        .fail(accountInfoError);
}

function accountInfoSuccess(data, textSatus, jqXHR) {
    $("#email").html(data.email);
    $("#fullName").html(data.fullName);
    $("#lastAccess").html(data.lastAccess);
    $("#main").show();

    // Add the devices to the list before the list item for the add device button (link)
    for (var device of data.devices) {
        $("#addDeviceForm").before("<li class='collection-item'>ID: " +
            device.deviceId + ", APIKEY: " + device.apikey +
            " <button id='ping-" + device.deviceId + "' class='waves-effect waves-light btn'>Ping</button> " +

            " <button id='activity-" + device.deviceId + "' class='waves-effect waves-light btn'>Activities</button> " +
            "</li>");
        $("#ping-" + device.deviceId).click(function(event) {
            pingDevice(event, device.deviceId);
        });
        $("#activity-" + device.deviceId).click(function(event) {
            getActivities(event, device.deviceId, data.email)

        });
    }
}

function accountInfoError(jqXHR, textStatus, errorThrown) {
    // If authentication error, delete the authToken 
    // redirect user to sign-in page (which is index.html)
    if (jqXHR.status === 401) {
        window.localStorage.removeItem("authToken");
        window.location.replace("http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/index.html");
    } else {
        $("#error").html("Error: " + status.message);
        $("#error").show();
    }
}

// Registers the specified device with the server.
function registerDevice() {
    $.ajax({
            url: 'http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/devices/register',
            type: 'POST',
            headers: { 'x-auth': window.localStorage.getItem("authToken") },
            contentType: 'application/json',
            data: JSON.stringify({ deviceId: $("#deviceId").val() }),
            dataType: 'json'
        })
        .done(function(data, textStatus, jqXHR) {
            // Add new device to the device list
            $("#addDeviceForm").before("<li class='collection-item'>ID: " +
                $("#deviceId").val() + ", APIKEY: " + data["apikey"] +
                " <button id='ping-" + $("#deviceId").val() + "' class='waves-effect waves-light btn'>Ping</button> " +

                " <button id='activity-" + $("#deviceId").val() + "' class='waves-effect waves-light btn'>Activities</button> " +
                "</li>");
            $("#ping-" + device.deviceId).click(function(event) {
                pingDevice(event, device.deviceId);
            });
            $("#activity-" + device.deviceId).click(function(event) {
                getActivities(event, device.deviceId, "");

            });
            hideAddDeviceForm();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            let response = JSON.parse(jqXHR.responseText);
            $("#error").html("Error: " + response.message);
            $("#error").show();
        });
}










function updateAccountInfo() {

    // $("select.info").change(function() {
    //     var selectedInfo = $(this).children("option:selected").val();
    // });
    //var instance = M.FormSelect.getInstance(elem);
    //selectedInfo = instance.getSelectedValues();
    var optionValues = "";

    $('#check option').each(function() {
        optionValues = $(this).val();
    });

    $('#test').html(optionValues);
    //$("#test").html($("#check").val(1))


    // $.ajax({
    //     url: 'http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/users/update',
    //     type: 'PUT',
    //     headers: { 'x-auth': window.localStorage.getItem("authToken") },
    //     contentType: 'application/json',
    //     data: JSON.stringify({ email: email, fullName: fullName, password: password }),
    //     dataType: 'json'
    // })
    // .done(function(data, textStatus, jqXHR) {
    //     // Add new device to the device list
    //     $("#addDeviceForm").before("<li class='collection-item'>ID: " +
    //         $("#deviceId").val() + ", APIKEY: " + data["apikey"] +
    //         " <button id='ping-" + $("#deviceId").val() + "' class='waves-effect waves-light btn'>Ping</button> " +

    //         " <button id='activity-" + $("#deviceId").val() + "' class='waves-effect waves-light btn'>Activities</button> " +
    //         "</li>");
    //     $("#ping-" + device.deviceId).click(function(event) {
    //         pingDevice(event, device.deviceId);
    //     });
    //     $("#activity-" + device.deviceId).click(function(event) {
    //         getActivities(event, device.deviceId);

    //     });
    //     hideAddDeviceForm();
    // })
    // .fail(function(jqXHR, textStatus, errorThrown) {
    //     let response = JSON.parse(jqXHR.responseText);
    //     $("#error").html("Error: " + response.message);
    //     $("#error").show();
    // });

}


// function sendRegisterRequest() {
//     let email = $('#email').val();
//     let password = $('#password').val();
//     let fullName = $('#fullName').val();
//     let passwordConfirm = $('#passwordConfirm').val();

//     // Check to make sure the passwords match
//     // FIXME: Check to ensure strong password 
//     if (password != passwordConfirm) {
//         $('#ServerResponse').html("<span class='red-text text-darken-2'>Passwords do not match.</span>");
//         $('#ServerResponse').show();
//         return;
//     }

//     $.ajax({
//             url: 'http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/users/register',
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify({ email: email, fullName: fullName, password: password }),
//             dataType: 'json'
//         })
//         .done(registerSuccess)
//         .fail(registerError);
// }
























function pingDevice(event, deviceId) {
    $.ajax({
        url: 'http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/devices/ping',
        type: 'POST',
        headers: { 'x-auth': window.localStorage.getItem("authToken") },
        data: { 'deviceId': deviceId },
        responseType: 'json',
        success: function(data, textStatus, jqXHR) {
            console.log("Pinged.");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var response = JSON.parse(jqXHR.responseText);
            $("#error").html("Error: " + response.message);
            $("#error").show();
        }
    });
}


function getActivities(event, deviceId, email) {




    $.ajax({
        url: 'http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/devices/status/' + deviceId,
        type: 'GET',
        headers: { 'x-auth': window.localStorage.getItem("authToken") },
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            // activity = JSON.stringify(data.activities)
            // alert(activity[2])

            //let user = ""
            for (var i = 0; i < data.activities.length; i++) {
                // $("#error").html(data.activities[i].userEmail);
                // $("#error").show();
                //user += data.activities[i].userEmail

                if (data.activities[i].userEmail === email) {
                    activity = JSON.stringify(data.activities[i])
                    activityData.push(activity)
                }


            }



            // $("#data").html(typeof JSON.parse(activityData[0]))
            //act = JSON.parse(activityData[0])
            //$("#data").html(act.GPSSpeed)

            window.localStorage.setItem("activityData", JSON.stringify(activityData))
            window.location = "http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/activities.html"



        },
        error: function(jqXHR, textStatus, errorThrown) {
            // If authentication error, delete the authToken 
            // redirect user to sign-in page (which is index.html)
            if (jqXHR.status === 401) {
                window.localStorage.removeItem("authToken");
                window.location.replace("http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/index.html");

            } else {
                $("#error").html("Error: " + status.message);
                $("#error").show();
            }
        }
    });

}



// Show add device form and hide the add device button (really a link)
function showAddDeviceForm() {
    $("#deviceId").val(""); // Clear the input for the device ID
    $("#addDeviceControl").hide(); // Hide the add device link
    $("#addDeviceForm").slideDown(); // Show the add device form

}

// Hides the add device form and shows the add device button (link)
function hideAddDeviceForm() {
    $("#addDeviceControl").show(); // Hide the add device link
    $("#addDeviceForm").slideUp(); // Show the add device form
    $("#error").hide();
    //$("#updateAccountForm").slideUp();
}

function showAccountUpdateForm() {
    $("#updateInfo").hide()
    $("#updateAccountForm").slideDown()

}

function hideAccountUpdateForm() {
    $("#updateInfo").show()
        //$('select').val('')
        //$("#check").find('option').attr("selected", false)
        //$('#check').prop('selectedIndex', -1)
        // $('#check option').each(function() {
        //     $(this).val(" ");
        //     // });
        // $('select').formselect();
    $("#updateAccountForm").slideUp()

}
// Handle authentication on page load
$(function() {
    $('select').formSelect();
    //$('select').material_select();

    // If there's no authToekn stored, redirect user to 
    // the sign-in page (which is index.html)
    if (!window.localStorage.getItem("authToken")) {
        window.location.replace("http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/index.html");
    } else {
        sendReqForAccountInfo();

    }

    // Register event listeners
    $("#addDevice").click(showAddDeviceForm);
    $("#registerDevice").click(registerDevice);
    $("#cancel").click(hideAddDeviceForm);

    $("#updateAccountForm").hide()
    $("#update").click(showAccountUpdateForm);
    $("#updateAccount").click(updateAccountInfo);
    $("#cancel2").click(hideAccountUpdateForm);
});