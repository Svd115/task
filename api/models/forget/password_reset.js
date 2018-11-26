	
	exports.on = function(email, psw, user_id, token){
		var client = require('../../../config/database.js').on();
		
		client.connect();
		
		client.query('UPDATE users SET psw=($1), token=null WHERE email=($2) AND id=($3) AND token=($4)', [psw, email, user_id, token], function(error, res){
			client.end();
			if(error){
				password_reset.emit("return", [false])
			}
			else{
				password_reset.emit("return", [true]);
			}
		});
	}