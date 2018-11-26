	
	exports.on = function(task, user_id){
		var client = require('../../../config/database.js').on();
		
		client.connect();
		
		client.query('INSERT INTO todo_list(user_id, task, date_creation) VALUES($1, $2, NOW()) RETURNING id', [user_id, task], function(error, res){
			client.end();
			if(error){
				ws_model_create.emit("return", [false])
			}
			else{
				ws_model_create.emit("return", [true, res.rows[0].id]);
			}
		});
	}