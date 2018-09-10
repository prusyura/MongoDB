var mongoose = require("../mongoose");
var SchemaUser = mongoose.Schema({
	name:{
		type: String,
		unique: true,
		required: true
	},
	age:{
		type: Number,
		required: true
	}
},{versionKey:false});
var User = mongoose.model("User",SchemaUser);
module.exports = User;