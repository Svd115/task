	
	exports.on = function(user_id){
		var client = require('../../../config/database.js').on();
		client.connect();
		
		client.query('SELECT id, task FROM todo_list WHERE user_id=($1) ORDER BY date_creation ASC', [user_id], function(error, result){
			client.end();
			get_list.emit('return', result.rows);
		})
	}