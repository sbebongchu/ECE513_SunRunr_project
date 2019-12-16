var db = require("../db");
//will be called Fitness
var potholeSchema = new db.Schema({
    /*loc:           { type: [Number], index: '2dsphere'},
    totalHits:     Number,
    zip:           String,
    lastReported:  { type: Date, default: Date.now },
    firstReported: { type: Date, default: Date.now }*/
    Longitudes: { type: [Number] },
    Latitudes: { type: Number },
    GPSSpeeds: { type: [Number] },
    UVReadings: { type: [Number] },
    FitnessTemps: { type: [Number] },
    FitnessHumd: { type: [Number] }
});

var Pothole = db.model("Pothole", potholeSchema);

module.exports = Pothole;