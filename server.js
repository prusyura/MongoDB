var express = require('express')
var bodyParser=require('body-parser');
var app = express()
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var User = require("./models/user")
//гет запит сторінки
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
});

//гет запит з бази
app.get("/getusers",function(req,res){
	User.find(function(err,data){
		console.log(data);
		res.send(data)
	})
});
//пост запит для добавки юзера
app.post("/adduser",function(req,res){
	console.log(req.body);
	var user = new User(req.body);
	user.save(function(err,data){
		console.log(data);
		res.send("add user!!!");
	})
})
//пост запит на видал юзера
app.post("/deleteuser",function(req,res){
	console.log(req.body);
	User.remove({_id:req.body.id},function(err,data){
		res.send("delete user!!!");
	})	
})
app.post("/updateuser",function(req,res){
	console.log(req.body);
	
	User.update({_id:req.body.id},{name:req.body.name,age:req.body.age},function(err,data){
		console.log(data);
		res.send("uppuser!!!");
	})
})
app.listen(process.env.PORT||8080);

console.log("Server run!");
