	exports.on = function (task, user_id, ent){
		console.log(task);
		var user_id = user_id;
		
		if(typeof user_id === "number"){
			var next = true;
			for(var i=0; i<task.length; i++){
				var id = Number(ent.encode(task[i]));
				
				if(isNaN(id)){
					next = false;
					error();
					break;
				}
			}
			
			if(next){
				ws_model_delete = require('../../modules/eventEmitter.js').on();
				
				require('../../models/todo_socket/delete.js').on(task, user_id);
				
				ws_model_delete.on('return', function(data){
					if(data){
						ws_delete.emit("return", [true, task]);
					}
					else{
						error();
					}
				});
			}
		}
		else{
			error();
		}
	
		function error(){
			ws_delete.emit("return", [false]);
		}
	}
	