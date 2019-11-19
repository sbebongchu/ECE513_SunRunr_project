var db = require("../db");

var userSchema = new db.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passwordHash: String,
    lastAccess: { type: Date, default: Date.now },
    userDevices: [String],
    // potholesHit:  [ { potholeId: Number, numHits: Number } ]
});

var User = db.model("User", userSchema);

module.exports = User;