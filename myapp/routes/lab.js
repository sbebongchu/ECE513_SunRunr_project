var express = require('express');
var router = express.Router();
var Recording = require("../models/recording");



router.get('/status', function(req, res, next) {
    var zip = req.query.zip;
    var regex = /^\d{1,5}$/;

    if (!req.query.hasOwnProperty("zip") || req.query.zip == "" || !(regex.test(req.query.zip))) {
        var errormsg = { "error": "a zip code is required." }
        res.status(400).send(JSON.stringify(errormsg));

        return;
    }

    Recording.find({ zip: { $eq: req.query.zip } }, function(err, zipRecord) {
            var j = 0;
            zipRecord.forEach(function(rec) {
                j = j + 1;
            })
            if (j == 0) {
                var errormsg = { "error": "Zip does not exist in the database." }
                res.status(400).send(JSON.stringify(errormsg));
                return
            } else {
                //res.status(200).json("something");
                var i = 0;
                var sumAirQual = 0;

                zipRecord.forEach(function(record) {
                    sumAirQual = sumAirQual + record.airQuality
                    i = i + 1;
                });
                //for (var record of zipRecord) {
                // sumAirQual = sumAirQual + record.airQuality
                // i = i + 1;
                // }
                var sumAvg = sumAirQual / i;
                sumAvg = sumAvg.toFixed(2)
                res.status(200).json(sumAvg);
            }
        }



    );




    /* Student.find({ gpa: { $gte: 3 }}, function(err, students) {
        console.log(students);
     });
    
    Device.find(query, function(err, allDevices) {
      if (err) {
        var errorMsg = {"message" : err};
        res.status(400).json(errorMsg);
      }
      else {
         for(var doc of allDevices) {
            responseJson.devices.push({ "deviceId": doc.deviceId,  "lastContact" : doc.lastContact});
         }
      }
      res.status(200).json(responseJson);
    });*/
});

router.post('/register', function(req, res, next) {
    /* var responseJson = {
         registered: false,
         message : "",
         apikey : "none"
     };
     var deviceExists = false;*/

    var regex1 = /^\d{1,5}$/;

    // Ensure the request includes the deviceId parameter
    if (!req.body.hasOwnProperty("zip") || req.body.zip == "" || !(regex1.test(req.body.zip))) {

        //responseJson.message = "Missing deviceId.";
        //return res.status(400).json(responseJson);
        //return res.status(400).json(errormsg);
        var errormsg = { "error": "zip and airQuality are required." }
        return res.status(400).send(JSON.stringify("error"));
    }

    // Ensure the request includes the email parameter
    if (!req.body.hasOwnProperty("airQuality") || req.body.airQuality == "") {
        //responseJson.message = "Invalid authorization token or missing email address.";
        //return res.status(400).json(responseJson);
        //return res.status(400).json(errormsg);
        var errormsg = { "error": "zip and airQuality are required." }
        return res.status(400).send(JSON.stringify(errormsg));
    }

    var newRecording = new Recording({
        /* deviceId: req.body.deviceId,
         userEmail: req.body.email,
         apikey: deviceApikey*/
        zip: req.body.zip,
        airQuality: req.body.airQuality
    });


    // Save device. If successful, return success. If not, return error message.
    newRecording.save(function(err, newRecording) {
        if (err) {
            console.log("Error: " + err);
            //responseJson.message = err;
            // This following is equivalent to:
            //     res.status(400).send(JSON.stringify(responseJson));
            return res.status(400).json(err);
        } else {
            /* responseJson.registered = true;
             responseJson.apikey = deviceApikey;
             responseJson.message = "Device ID " + req.body.deviceId + " was registered.";
             return res.status(201).json(responseJson);*/

            var msg = { "response": "Data recorded." }
            return res.status(201).json(msg);
        }
    });
});








// Function to generate a random apikey consisting of 32 characters
/*function getNewApikey() {
    var newApikey = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 32; i++) {
       newApikey += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return newApikey;
}

// GET request return one or "all" devices registered and last time of contact.
router.get('/status', function(req, res, next) {
    var deviceId = req.params.devid;
    var responseJson = { devices: [] };

    if (deviceId == "all") {
      var query = {};
    }
    else {
      var query = {
          "deviceId" : deviceId
      };
    }
    
    Device.find(query, function(err, allDevices) {
      if (err) {
        var errorMsg = {"message" : err};
        res.status(400).json(errorMsg);
      }
      else {
         for(var doc of allDevices) {
            responseJson.devices.push({ "deviceId": doc.deviceId,  "lastContact" : doc.lastContact});
         }
      }
      res.status(200).json(responseJson);
    });
});*/

// See if device is already registered
/*Device.findOne({ deviceId: req.body.deviceId }, function(err, device) {
        if (device !== null) {
            responseJson.message = "Device ID " + req.body.deviceId + " already registered.";
            return res.status(400).json(responseJson);
        }
        else {
            // Get a new apikey
	         deviceApikey = getNewApikey();
	         
	         // Create a new device with specified id, user email, and randomly generated apikey.
            var newDevice = new Device({
                deviceId: req.body.deviceId,
                userEmail: req.body.email,
                apikey: deviceApikey
            });

            // Save device. If successful, return success. If not, return error message.
            newDevice.save(function(err, newDevice) {
                if (err) {
                    console.log("Error: " + err);
                    responseJson.message = err;
                    // This following is equivalent to:
                    //     res.status(400).send(JSON.stringify(responseJson));
                    return res.status(400).json(responseJson);
                }
                else {
                    responseJson.registered = true;
                    responseJson.apikey = deviceApikey;
                    responseJson.message = "Device ID " + req.body.deviceId + " was registered.";
                    return res.status(201).json(responseJson);
                }
            });
        }
    });
});*/


module.exports = router;