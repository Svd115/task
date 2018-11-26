	exports.on = function (req, res, session, ent){
		var task = ent.encode(req.body.task);
		var task_id = Number(ent.encode(req.body.task_id));
		var user_id = session.user;
		
		if(typeof user_id === "number" && typeof task_id === "number"){
			task = task.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&middot;/g, "{*}");
			
			if(/^\s*$/.test(task)){
				error("Task required before sending !!");
			}
			else{
				update = require('../../modules/eventEmitter.js').on();
				
				require('../../models/todo/update.js').on(task, task_id, user_id);
				
				update.on('return', function(data){
					if(data){
						session.infos = ["success", "Task updated with success !!"];
						res.redirect("/");
					}
					else{
						error("This task cannot be updated !!");
					}
				});
			}
		}
		else{
			error("Impossible to update this task !!");
		}
	
		function error(e){
			require("../../modules/error.js").on("danger", e, session, res);
		}
	}