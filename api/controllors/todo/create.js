	exports.on = function (req, res, session, ent){
		var task = ent.encode(req.body.task);
		var user_id = session.user;
		
		if(typeof user_id === "number"){
			task = task.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&middot;/g, "{*}");
			
			if(/^\s*$/.test(task)){
				error("Task required before sending !!");
			}
			else{
				create = require('../../modules/eventEmitter.js').on();
				
				require('../../models/todo/create.js').on(task, user_id);
				
				create.on('return', function(data){
					if(data){
						session.infos = ["success", "New task created with success !!"];
						res.redirect("/");
					}
					else{
						error("This task cannot be created !!");
					}
				});
			}
		}
		else{
			error("Impossible to create a new task !!");
		}
	
		function error(e){
			require("../../modules/error.js").on("danger", e, session, res);
		}
	}
	