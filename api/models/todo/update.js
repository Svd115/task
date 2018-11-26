	
	exports.on = function(task, task_id, user_id){
		var client = require('../../../config/database.js').on();
		
		client.connect();
		
		client.query('UPDATE todo_list SET task=($1) WHERE id=($2) AND user_id=($3)', [task, task_id, user_id], function(error, res){
			if(error){
				console.log(error);
				update.emit("return", false)
			}
			else{
				update.emit("return", true);
			}
		});
	}