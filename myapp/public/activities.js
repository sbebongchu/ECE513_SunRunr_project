function getActivities2() {
    //$("#walk").hide()
    //let data = window.localStorage.getItem("activityData")
    let walk = "<ul> <li> bees </li>"
    let run = "<ul>"
    let bike = "<ul>"
        // Add the devices to the list before the list item for the add device button (link)
        // responseJson.devices.push({
        //     "deviceId": doc.deviceId,
        //     "userEmail": Device.userEmail,
        //     "longitude": doc.longitude,
        //     "latitude": doc.latitude,
        //     "GPSSpeed": doc.GPSSpeed,
        //     "UVReading": doc.UVReading
    let i = 0
        //for (var activity in data) {
    while (i < activityData.length) {
        walk += "<li>" + activityData.length + "</li>"




        // if (activity.GPSSpeed < 10) {
        //     walk += "<li>" +
        //         "Longitude: " + activity.longitude + ", Latitude: " + activity.latitude + ", Speed: " + activity.GPSSpeed + ",UV Reading " + activity.UVReading +
        //         "</li>";
        // } else if (activity.GPSSpeed > 9 && activity.GPSSpeed < 20) {
        //     run += "<li>" +
        //         "Longitude: " + activity.longitude + ", Latitude: " + activity.latitude + ", Speed: " + activity.GPSSpeed + ",UV Reading " + activity.UVReading +
        //         "</li>";
        // } else {
        //     bike += "<li>" + "Longitude: " + activity.longitude + ", Latitude: " + activity.latitude + ", Speed: " + activity.GPSSpeed + ",UV Reading " + activity.UVReading +
        //         "</li>";
        // }
        i = i + 1
    }
    $("#walk").html(walk + "</ul>")
    $("#walking").click(function(event) {
        $("#walk").hide()

    });
    $("#running").click(function(event) {
        document.getElementById("run").innerHTML = run + "</ul>"
    });
    $("#biking").click(function(event) {
        document.getElementById("bike").innerHTML = bike + "</ul>"
    });

}




// Handle authentication on page load
$(function() {
    // If there's no authToekn stored, redirect user to 
    // the sign-in page (which is index.html)
    if (!window.localStorage.getItem("authToken")) {
        window.location.replace("http://ec2-18-223-182-143.us-east-2.compute.amazonaws.com:3000/account.html");
    } else {
        getActivities2();
    }

});