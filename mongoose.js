var mongoose = require("mongoose");
mongoose.connect("mongodb://user1:user22@ds237072.mlab.com:37072/mybase");
console.log("mongoDB connect....");
module.exports = mongoose;