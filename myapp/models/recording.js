var db = require("../db");

/*var deviceSchema = new db.Schema({
    apikey:       String,
    deviceId:     String,
    userEmail:    String,
    lastContact:  { type: Date, default: Date.now }
});*/

//var Device = db.model("Device", deviceSchema);

var Recording = db.model("Recording", {
    zip: { type: Number },
    airQuality: { type: Number }
});

module.exports = Recording;