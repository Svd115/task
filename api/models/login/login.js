	
	exports.on = function(email){
		var client = require('../../../config/database.js').on();
		client.connect();
		
		client.query('SELECT id, psw FROM users WHERE email =($1) AND token IS NULL', [email], function(error, res){
			client.end();
			if(error){
				login.emit("return", [false]);
			}
			else{
				if(res.rows[0]){
					login.emit("return", [true, res.rows[0]['id'], res.rows[0]['psw']]);
				}
				else{
					login.emit("return", [false]);
				}
			}
		})
	}