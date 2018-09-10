$(document).ready(function(){

	var iduser = "";

	// функція вивід юзерів з сервера
	function getUsers(){
		$.get("/getusers",function(data){
			createTable(data,$("#table"));
		})	
	}
	//функція вивід юзерів в таблицю
	function createTable(mas,element){
		$(element).empty()
		$("<table>").addClass("table")
		.addClass("table-border")
		.addClass("table-primary")
		.appendTo(element);
		for(var i = 0; i < mas.length; i++){
			$("<tr>").addClass("tr").appendTo(".table");
			for(var key in mas[i]) {
				$("<td>").addClass("td").appendTo(".tr:last")
				.text(mas[i][key]);
				$(".tr:last td:first").hide();//приховати айді

			}
			// button delete
			$("<td>").addClass("td").appendTo("tr:last");
			$("<button>").css({"float":"right"}).addClass("btn").addClass("btn-danger")
			.appendTo(".td:last").text("Delete")
			//знищення через кнопку
			.click(function(){
				var id = $(this).parent().parent()
					.children().filter(":first")
					.text();
					//console.log(id);
					deleteUser(id);

			})
			$("<td>").addClass("td").appendTo("tr:last");
			$("<button>").css({"float":"right"}).addClass("btn").addClass("btn-primary")
			.appendTo(".td:last").text("Update")
			//вивід на імпут юзера через кнопку для заміни
			.click(function(){
				var id = $(this).parent().parent()
					.children().filter(":first")
					.text();

					iduser = id;

					var name = $(this).parent().parent()
					.children().filter(":eq(1)")
					.text();
					$(".name").val(name);

					var age =$(this).parent().parent()
					.children().filter(":eq(2)")
					.text();
					$(".age").val(age);
			})

		}
	}
	//функція добавляння юзера
	function addUser(name,age){
		var obj = {
				name: name,
				age: age
			}
		if(!iduser){
			if(!name||!age)return;
			$.post("/addUser",obj,function(data){
			console.log(data);
			getUsers();
			})
		}
		//переміна юзера
		else{
			obj.id = iduser;
			$.post("/updateuser",obj,function(data){
				iduser = "";
				console.log(data);
				getUsers();
				})
			}
			
		
	}
	//функція знищення юзера
	function deleteUser(id){
		var obj = {id:id};
		$.post("/deleteuser",obj,function(data){
			console.log(data);
			getUsers();
		})
	}
	//добавка через форму
	$(".adduser").click(function(){
		addUser($(".name").val(),$(".age").val());
		$('.name').val("");
		$('.age').val("");

	});
	//знищення через кнопку
	
	getUsers();
});