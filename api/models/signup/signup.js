	
	exports.on = function(email, psw){
		var client = require('../../../config/database.js').on();
		
		client.connect();
		
		var token = require('../../../api/modules/token.js').on();
		
		client.query('INSERT INTO users(email, psw, token) VALUES($1, $2, $3) RETURNING id', [email, psw, token], function(error, res){
			client.end();
			if(error){
				get_signup.emit("return", [false])
			}
			else{
				get_signup.emit("return", [true, res.rows[0].id, token]);
			}
		});
	}