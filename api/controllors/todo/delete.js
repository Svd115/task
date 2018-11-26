	exports.on = function (req, res, session, ent){
		var user_id = session.user;
		var task = req.body.task_id.split(",");
		
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
				delete_task = require('../../modules/eventEmitter.js').on();
				
				require('../../models/todo/delete.js').on(task, user_id);
				
				delete_task.on('return', function(data){
					if(data){
						session.infos = ["success", "This task has been deleted with success !!"];
						res.redirect("/");
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
			require("../../modules/error.js").on("danger", "This task cannot be deleted !!", session, res);
		}
	}
	