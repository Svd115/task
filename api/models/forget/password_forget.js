	
	exports.on = function(user_id, token){
		var client = require('../../../config/database.js').on();
		
		client.connect();
		
		client.query('SELECT exists(SELECT id FROM users WHERE id=($1) AND token=($2)) AS re', [user_id, token], function(error, res){
			client.end();
			if(error){
				password_forget.emit("return", [false])
			}
			else{
				if(res.rows[0].re){
					password_forget.emit("return", [true]);
				}
				else{
					password_forget.emit("return", [false])
				}
			}
		});
	}