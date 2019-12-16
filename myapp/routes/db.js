var mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost/ECE513_SunRunr_projectdb", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = mongoose;