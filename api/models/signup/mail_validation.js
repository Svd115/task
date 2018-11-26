	
	exports.on = function(user_id, token){
		var client = require('../../../config/database.js').on();
		
		client.connect();
		
		client.query('SELECT true FROM users WHERE id=($1) AND token=($2)', [user_id, token], function(error, res){
			if(res.rows[0]){
				client.query('UPDATE users SET token = NULL WHERE id=($1) AND token=($2) RETURNING true', [user_id, token], function(error, res){
					client.end();
					if(res.rows[0]){
						mail_validation.emit("return", [true]);
					}
					else{
						mail_validation.emit("return", [false]);
					}
				})
			}
			else{
				client.end();
				mail_validation.emit("return", [false]);
			}
		});
	}