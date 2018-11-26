	exports.on = function (task, user_id, ent){
		var task = ent.encode(task);
		var user_id = user_id;
		
		if(typeof user_id === "number"){
			task = task.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&middot;/g, "{*}");
			
			if(/^\s*$/.test(task)){
				error();
			}
			else{
				ws_model_create = require('../../modules/eventEmitter.js').on();
				
				require('../../models/todo_socket/create.js').on(task, user_id);
				
				ws_model_create.on('return', function(data){
					if(data[0]){
						ws_create.emit("return", [true, data[1], task]);
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
			ws_create.emit("return", [false]);
		}
	}
	