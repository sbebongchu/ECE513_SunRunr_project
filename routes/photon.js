var express = require('express');
const request = require('request');
var router = express.Router();
var Device = require("../models/device");
var HwData = require("../models/hwdata");

/* POST: Register new device. */
router.post('/hit', function(req, res, next) {
    var responseJson = {
        status: "",
        message: ""
    };

    request('http://api.openweathermap.org/data/2.5/forecast?APPID=bb3fbce58cae213a3a83cf482ce85721', { json: true },

        (err, res, body) => {

            if (err) {
                let errorMsg = { "message": err };
                return res.status(400).json(errorMsg);
            }
            var temp = body.main.temp
            var hum = body.main.humidity


            // Ensure the POST data include properties id and email
            if (!req.body.hasOwnProperty("deviceId")) {
                responseJson.status = "ERROR";
                responseJson.message = "Request missing deviceId parameter.";
                return res.status(201).send(JSON.stringify(responseJson));
            }

            if (!req.body.hasOwnProperty("apikey")) {
                responseJson.status = "ERROR";
                responseJson.message = "Request missing apikey parameter.";
                return res.status(201).send(JSON.stringify(responseJson));
            }

            if (!req.body.hasOwnProperty("lon")) {
                responseJson.status = "ERROR";
                responseJson.message = "Request missing longitude parameter.";
                return res.status(201).send(JSON.stringify(responseJson));
            }

            if (!req.body.hasOwnProperty("lat")) {
                responseJson.status = "ERROR";
                responseJson.message = "Request missing latitude parameter.";
                return res.status(201).send(JSON.stringify(responseJson));
            }

            if (!req.body.hasOwnProperty("GPS_speed")) {
                responseJson.status = "ERROR";
                responseJson.message = "Request missing GPS speed parameter.";
                return res.status(201).send(JSON.stringify(responseJson));
            }

            if (!req.body.hasOwnProperty("uv")) {
                responseJson.status = "ERROR";
                responseJson.message = "Request missing uv parameter.";
                return res.status(201).send(JSON.stringify(responseJson));
            }

            // Find the device and verify the apikey
            Device.findOne({ deviceId: req.body.deviceId }, function(err, device) {
                if (device !== null) {
                    if (device.apikey != req.body.apikey) {
                        responseJson.status = "ERROR";
                        responseJson.message = "Invalid apikey for device ID " + req.body.deviceId + ".";
                        return res.status(201).send(JSON.stringify(responseJson));
                    } else {
                        // Create a new hw data with user email time stamp 
                        /* var newHwData = new HwData({
                           userEmail: device.userEmail,
                           deviceid: req.body.deviceId,
                           longitude: req.body.longitude,
                           latitude: req.body.latitude
                         });*/

                        var newHwData = new HwData({
                            deviceId: req.body.deviceId,
                            userEmail: device.userEmail,
                            longitude: req.body.lon,
                            latitude: req.body.lat,
                            GPSSpeed: req.body.GPS_speed,
                            UVReading: req.body.uv,
                            Temp: temp,
                            Humd: hum
                        });

                        // Save device. If successful, return success. If not, return error message.                          
                        newHwData.save(function(err, newHwData) {
                            if (err) {
                                responseJson.status = "ERROR";
                                responseJson.message = "Error saving data in db.";
                                return res.status(201).send(JSON.stringify(responseJson));
                            } else {
                                responseJson.status = "OK";
                                responseJson.message = "Data saved in db with object ID " + newHwData._id + ".";
                                return res.status(201).send(JSON.stringify(responseJson));
                            }
                        });
                    }
                } else {
                    responseJson.status = "ERROR";
                    responseJson.message = "Device ID " + req.body.deviceId + " not registered.";
                    return res.status(201).send(JSON.stringify(responseJson));
                }
            });



        });


});

//get all gps locations
// GET request return one or "all" devices registered and last time of contact.
router.get('/status/:devid', function(req, res, next) {
    let deviceId = req.params.devid;
    let responseJson = { devices: [] };

    if (deviceId == "all") {
        let query = {};
    } else {
        let query = {
            "deviceId": deviceId
        };
    }

    /* Device.find(query, function(err, allDevices) {
         if (err) {
             let errorMsg = { "message": err };
             res.status(400).json(errorMsg);
         } else {
             for (let doc of allDevices) {
                 responseJson.devices.push({ "deviceId": doc.deviceId });
             }
         }
         res.status(200).json(responseJson);
     });*/

    HwData.find(query, function(err, allDevices) {
        if (err) {
            let errorMsg = { "message": err };
            res.status(400).json(errorMsg);
        } else {
            for (let doc of allDevices) {
                responseJson.devices.push({
                    "deviceId": doc.deviceId,
                    "userEmail": device.userEmail,
                    "longitude": req.query.longitude,
                    "latitude": req.query.latitude,
                    "GPSSpeed": req.query.GPSSpeed,
                    "UVReading": req.query.UVReading
                });
            }
        }
        res.status(200).json(responseJson);
    });
});

module.exports = router;