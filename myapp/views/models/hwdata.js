var db = require("../db");

// Define the schema
var hwDataSchema = new db.Schema({
    deviceId: String,
    userEmail: String,
    longitude: Number,
    latitude: Number,
    GPSSpeed: Number,
    UVReading: Number,
    Temp: Number,
    Humd: Number,
    actType: String
});

// Creates a Devices (plural) collection in the db using the device schema
var HwData = db.model("HwData", hwDataSchema);

module.exports = HwData;