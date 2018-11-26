	exports.on = function (req, res, session, ent){
		const bcrypt = require('bcrypt');
		
		var email = ent.encode(req.body.email);
		var psw = ent.encode(req.body.psw);

		if(/^\s*$/.test(psw) && /^\s*$/.test(email)){
			error("Email and password required !!");
		}
		else{
			if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
				if(psw.length < 8){
					error("Invalid password : minimum 8 characters with 1 uppercase, 1 lowercase and 1 number !!");
				}
				else{
					login = require('../../modules/eventEmitter.js').on();
				
					require('../../models/login/login.js').on(email);
					
					login.on('return', function(data){
						if(data[0]){
							bcrypt.compare(psw, data[2], function(e, r){
								if(e || !r){
									error("Email or password incorrect !!");
								}
								else{
									session.user = data[1];
									res.redirect("/");
								}
							});
						}
						else{
							error("Email or password incorrect !!");
						}
					});
				}
			}
			else{
				error("Invalid email adresse !!");
			}
		}
	
		function error(e){
			require("../../modules/error.js").on("danger", e, session, res);
		}
	}
	