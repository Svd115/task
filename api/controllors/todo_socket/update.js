	exports.on = function (task, task_id, user_id, ent){
		var task = ent.encode(task);
		var task_id = Number(task_id);
		var user_id = user_id;
		
		if(typeof user_id === "number" && typeof task_id === "number"){
			task = task.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&middot;/g, "{*}");
			
			if(/^\s*$/.test(task)){
				error();
			}
			else{
				ws_model_update = require('../../modules/eventEmitter.js').on();
				
				require('../../models/todo_socket/update.js').on(task, task_id, user_id);
				
				ws_model_update.on('return', function(state){
					if(state){
						ws_update.emit("return", [true, task, task_id]);
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
			ws_update.emit("return", [false]);
		}
	}