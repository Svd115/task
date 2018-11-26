	
	exports.on = function(email){
		var client = require('../../../config/database.js').on();
		
		client.connect();
		
		var token = require('../../../api/modules/token.js').on();
		
		client.query('UPDATE users SET token=($1) WHERE email=($2) AND token IS NULL RETURNING id', [token, email], function(error, res){
			client.end();
			if(error){
				console.log(error);
				forget.emit("return", [false]);
			}
			else{
				console.log(res.rows);
				if(res.rows[0]){
					forget.emit("return", [true, res.rows[0].id, token]);
				}
				else{
					console.log("ici");
					forget.emit("return", [false])
				}
			}
		});
	}