	
	exports.on = function(task, user_id){
		var client = require('../../../config/database.js').on();
		
		client.connect();
		
		var sql = "";
		
		for(var i=0; i<task.length;i++){
			sql += "DELETE FROM todo_list WHERE id="+task[i]+" AND user_id="+user_id+";";
		}
		
		client.query(sql, function(error, res){
			client.end();
			if(error){
				delete_task.emit("return", false)
			}
			else{
				delete_task.emit("return", true);
			}
		});
	}