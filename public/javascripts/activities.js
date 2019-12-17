var forecast = [];

function getActivities2() {
    $("#walk").hide()
    $("#run").hide()
    $("#bike").hide()

    let data = JSON.parse(window.localStorage.getItem("activityData"))
        //activityData = []
    let walk = "<ul class='collection with-header'> "
    let run = "<ul class='collection with-header'> "
    let bike = "<ul class='collection with-header'> "
        // Add the devices to the list before the list item for the add device button (link)
        // responseJson.devices.push({
        //     "deviceId": doc.deviceId,
        //     "userEmail": Device.userEmail,
        //     "longitude": doc.longitude,
        //     "latitude": doc.latitude,
        //     "GPSSpeed": doc.GPSSpeed,
        //     "UVReading": doc.UVReading
        //let i = 0
        //for (var activity in data) {
        //     //while (i < data.length) {
    for (var i = 0; i < data.length; i++) {
        //walk += "<li>" + data[i] + "</li>"


        activity = JSON.parse(data[i])
        if (activity.GPSSpeed < 10) {
            walk += "<li class='collection-item'>" +

                ///////continue editing
                "Longitude: " + activity.longitude + ", Latitude: " + activity.latitude + ", Speed: " + activity.GPSSpeed + ", UV Reading: " + activity.UVReading +
                "</li>";
        } else if (activity.GPSSpeed > 9 && activity.GPSSpeed < 20) {
            run += "<li class='collection-item'>" +
                "Longitude: " + activity.longitude + ", Latitude: " + activity.latitude + ", Speed: " + activity.GPSSpeed + ", UV Reading: " + activity.UVReading +
                "</li>";
        } else {
            bike += "<li class='collection-item'>" +
                "Longitude: " + activity.longitude + ", Latitude: " + activity.latitude + ", Speed: " + activity.GPSSpeed + ", UV Reading: " + activity.UVReading +
                "</li>";
        }
        $("#walk").html(walk + "</ul>")
        $("#run").html(run + "</ul>")
        $("#bike").html(bike + "</ul>")
    }

    $("#walking").click(function(event) {
        $("#walk").toggle()
    });

    $("#running").click(function(event) {
        $("#run").toggle()
    });
    $("#biking").click(function(event) {
        $("#bike").toggle()

    });



}

function getActivities3() {
    var endpoint = "http://api.openweathermap.org/data/2.5/forecast";
    var apikey = "bb3fbce58cae213a3a83cf482ce85721"
    var queryString = "zip=85721" + "&units=imperial&appid=" + apikey;
    var url = endpoint + "?" + queryString;

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", responseReceiveHandler);
    xhr.responseType = "json";
    xhr.open("GET", url);
    xhr.send()

}

function responseReceiveHandler() {
    if (this.status === 200) {

        $("#act").click(function(event) {
            $("#activities").toggle()

        });
        $("#uvReading").click(function(event) {
            $("#uv").toggle()

        });
    }
}
// $.ajax({
//     url: 'http://api.openweathermap.org/data/2.5/forecast?zip=85721,us&APPID=bb3fbce58cae213a3a83cf482ce85721',
//     type: 'GET',
//     //headers: { 'x-auth': window.localStorage.getItem("authToken") },
//     dataType: 'json',
//     CcontentType: "application/json",
//     success: function(data) {
//         $("#activities").show();

//         for (var i = 0; i < data.list.length; i++) {
//             weatherInfo = JSON.stringify(data.list[i])
//             forecast.push(weatherInfo)
//         }


//         // window.localStorage.setItem("activityData", JSON.stringify(activityData))
//         // window.location = "http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/activities.html"



//     },
//     error: function() {

//         //$("#error").html("Error: " + status.message);
//         $("#uv").show();

//     }
// });





// Handle authentication on page load
$(function() {
    // If there's no authToekn stored, redirect user to 
    // the sign-in page (which is index.html)
    $("#uv").hide()
    $("#activities").hide()
    if (!window.localStorage.getItem("authToken")) {
        window.location.replace("http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/account.html");
    } else {

        getActivities2();
    }

});