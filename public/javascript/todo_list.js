				var socket = io.connect();
				
				socket.on('disconnect', function(message){
					socket.close();
					infos('danger', "Connection lost !! Please refresh the page and reconnect.", true);
				});
				
				socket.on('new', function(message){
					new_task(message);
				})
				
				socket.on('update', function(message){
					update_task(message);
				})
				
				socket.on('delete', function(message){
					delete_task(message);
				})
				
				var todo_selected = 0;
				var todo_list_id = [];
				var edit = "";
				
				var todo_list_head_home = $("#todo_list_head").html();
				var todo_list_head_menu = 
						'<button type="button" id="back" class="btn btn-link m-0 p-0" title="Back"><i class="fas fa-arrow-left"></i></button>'+
						'<button type="button" id="edit" class="btn btn-link m-0 p-0" title="Edit"><i class="fas fa-pen"></i></button>'+
						'<form class="m-0 p-0" id="delete" method="post" action="/">'+
						'	<input type="hidden" name="task_id"/>'+
						'	<button type="submit" class="btn btn-link m-0 p-0" title="Delete" name="del"><i class="fas fa-trash-alt"></i></button>'+
						'</form>';
				var todo_list_head_edit = 
						'<button type="button" id="back" class="btn btn-link m-0 p-0" title="Back"><i class="fas fa-arrow-left"></i></button>'+
						'<h5 class="m-0 p-0">Edit</h5>'+
						'<form class="m-0 p-0" method="post" action="/">'+
						'	<button type="submit" class="btn btn-link m-0 p-0" title="Logout" name="logout"><i class="fas fa-power-off fas-o" ></i></button>'+
						'</form>';
				
				$(document).on("click", ".todo", function(){
					if(edit.length === 0){
						if(!$(this).hasClass("todo_selected")){
							$(this).addClass("todo_selected");
							todo_selected++;
							todo_list_id.push(this.id);
						}
						else{
							$(this).removeClass("todo_selected");
							todo_selected--;
							var id = this.id;
							todo_list_id = todo_list_id.filter(function(e){
								return e != id;
							});
						}
						
						if(todo_selected === 1){
							$("#todo_list_head").removeClass("bg-primary");
							$("#todo_list_head").addClass("bg-danger");
							$("#todo_list_head").html("");
							$(todo_list_head_menu).appendTo($("#todo_list_head"));
						}
						else if(todo_selected === 0){
							$("#todo_list_head").removeClass("bg-danger");
							$("#todo_list_head").addClass("bg-primary");
							$("#todo_list_head").html("");
							$(todo_list_head_home).appendTo($("#todo_list_head"));
						}
					}
				});
				
				$(document).on("click","#back", function(){
					back();
				});
			
				$(document).on("submit","#delete", function(e){
					e.preventDefault();
					this["task_id"].value = todo_list_id;
					socket.emit("delete_task", todo_list_id);
					todo_list_id = [];
					back();
					loading();
				});
				
				$(document).on("click","#edit", function(){
					edit = todo_list_id[todo_list_id.length-1];
					$("#task_id").val(edit);
					$("[name=task]").val($("[id="+edit+"]").text());
					$("[name=task]").focus();
					$("[name=create]").text("Edit");
					$("[name=create]").attr("name", "update");
					
					$("#todo_list_head").html("");
					$(todo_list_head_edit).appendTo($("#todo_list_head"));
					
					$(".todo").removeClass("todo_selected");
					$("[id="+edit+"]").addClass("todo_selected");
					
				});
			
				$(document).on("submit","#task_form", function(e){
					e.preventDefault();
					var task = this["task"].value;
					var task_id = Number(this["task_id"].value);
					task = task.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&middot;/g, "{*}");
 
					if(/^\s*$/.test(task)){
						infos("danger", "Task required before sending !!");
					}
					else{
						$(this["task"]).val("");
						
						if(this[2].name === "create"){
							socket.emit("new_task", task);
						}
						else if(this[2].name === "update"){
							socket.emit("update_task", [task, task_id]);
						}
						
						back();
						loading();
					}
				});
			
				function back(){
					$("#todo_list_head").removeClass("bg-danger");
					$("#todo_list_head").addClass("bg-primary");
					$("#todo_list_head").html("");
					$(todo_list_head_home).appendTo($("#todo_list_head"));
					$("[name=task]").val("");
					$("#task_id").val("");
					$(".todo").removeClass("todo_selected");
					$("[name=update]").text("Send");
					$("[name=update]").attr("name", "create");
					
					todo_selected = 0;
					edit = "";
				}

				function loading(){
					$("#loading").css("display", "");
				}
				
				function unloading(){
					$("#loading").css("display", "none");
					
					if($(".todo").length > 0){
						$("#no_todo").css("display", "block");
					}
					else{
						$("#no_todo").css("display", "none");
					}
				}
				
				function new_task(message){
					if(message[0]){
						var $todo = $('<div />').appendTo("#todo_list_body_table");
						$todo.attr("class", "todo");
						$todo.attr("id", message[1]);
						$todo.text(message[2]);
						
						var height = $('#todo_list_body_table')[0].scrollHeight;
						$('#todo_list_body_table').animate({
							scrollTop: height+"px"
						}, 1000);
						
						infos("success", "New task created with success !!")
					}
					else{
						infos("danger", "This task cannot be created !!");
					}
					
					unloading();
				}
				
				function update_task(message){
					if(message[0]){
						$("#"+message[2]).text(message[1]);
						infos("success", "Task updated with success !!")
					}
					else{
						infos("danger", "This task cannot be updated !!");
					}
					
					unloading();
				}
				
				function delete_task(message){
					if(message[0]){
						message[1].forEach(function(id){
							$("#"+id).remove();
						});
						infos("success", "Task deleted with success !!")
					}
					else{
						infos("danger", "Task cannot be deleted !!");
					}
					
					unloading();
				}