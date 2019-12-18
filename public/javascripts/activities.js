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
    let totalUV = 0
    let uv = []

    let read = ""
    for (var i = 0; i < data.length; i++) {
        //walk += "<li>" + data[i] + "</li>"


        activity = JSON.parse(data[i])
        totalUV += activity.UVReading;

        // read = "{ y:" + activity.UVReading + " }"
        // forecast.push(read)

        if (activity.GPSSpeed < 10) {
            walk += "<li class='collection-item'>" +

                ///////continue editing
                "Longitude: " + activity.longitude + ", Latitude: " + activity.latitude + ", Speed: " + activity.GPSSpeed + ", UV Reading: " + activity.UVReading +
                ", Temperature: " + activity.Temp + "&deg;F" +
                ", Humidity: " + activity.Humd + ", Activity Type: " + activity.actType + ", Activity Date: " + ((new Date()).getMonth() + 1) + "/" + (new Date()).getDay() + "/" + (new Date()).getFullYear() + "</li>";
        } else if (activity.GPSSpeed > 9 && activity.GPSSpeed < 20) {
            run += "<li class='collection-item'>" +
                "Longitude: " + activity.longitude + ", Latitude: " + activity.latitude + ", Speed: " + activity.GPSSpeed + ", UV Reading: " + activity.UVReading +
                ", Temperature: " + activity.Temp + "&deg;F" + ", Humidity: " + activity.Humd + ", Activity Type: " + activity.actType + "</li>";
        } else {
            bike += "<li class='collection-item'>" +
                "Longitude: " + activity.longitude + ", Latitude: " + activity.latitude + ", Speed: " + activity.GPSSpeed + ", UV Reading: " + activity.UVReading +
                ", Temperature: " + activity.Temp + "&deg;F" + ", Humidity: " + activity.Humd + ", Activity Type: " + activity.actType + "</li>";
        }
        $("#totalUV").html("Total UV Exposure: " + totalUV)
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


    // var chart = new CanvasJS.Chart("chartContainer", {
    //     animationEnabled: true,
    //     theme: "light2",
    //     title: {
    //         text: "Simple Line Chart"
    //     },
    //     axisY: {
    //         includeZero: false
    //     },
    //     data: [{
    //         type: "line",
    //         dataPoints: forecast
    // [
    //     { y: 450 },
    //     { y: 414 },
    //     { y: 520, indexLabel: "highest", markerColor: "red", markerType: "triangle" },
    //     { y: 460 },
    //     { y: 450 },
    //     { y: 500 },
    //     { y: 480 },
    //     { y: 480 },
    //     { y: 410, indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" },
    //     { y: 500 },
    //     { y: 480 },
    //     { y: 510 }
    //             // ]
    //     }]
    // });
    // chart.render();



}

function getActivities3() {
    var endpoint = "http://api.openweathermap.org/data/2.5/uvi/forecast";
    var apikey = "bb3fbce58cae213a3a83cf482ce85721"
        //var queryString = "zip=85721" + "&units=imperial&appid=" + apikey;
    var queryString = "lat=32.23&lon=-110.95" + "&units=imperial&appid=" + apikey;
    var url = endpoint + "?" + queryString;

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", responseReceiveHandler);
    xhr.responseType = "json";
    xhr.open("GET", url);
    xhr.send()

}

function responseReceiveHandler() {
    if (this.status === 200) {

        //var response = typeof(this.response[0].value)
        for (var i = 1; i < 6; i++) {
            obj = this.response[i - 1].value
            $("#day" + i).html(obj)

        }

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
//         // window.location = "activities.html"



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
        getActivities3();
    }

});