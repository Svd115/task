	exports.on = function (req, res, session, ent){
		const bcrypt = require('bcrypt');
		
		var user_id = Number(ent.encode(req.params.id));
		var token = ent.encode(req.params.token);
		
		var email = ent.encode(req.body.email);
		var psw = ent.encode(req.body.psw);
		var confirm_psw = ent.encode(req.body.confirm_psw);

		if(/^\s*$/.test(psw) && /^\s*$/.test(email) && /^\s*$/.test(confirm_psw)){
			error("Email, password and confirmation password required !!");
		}
		else{
			if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
				if(psw.length < 8){
					error("Invalid password : minimum 8 characters with 1 uppercase, 1 lowercase and 1 number !!");
				}
				else {
					if(psw !== confirm_psw){
						error("Please confirm correctly your password !!");
					}
					else{
						// Crypter psw, puis insertion psw, email et token validation dans bdd en faisant 
						
						bcrypt.hash(psw, 10, function(err, hash){
							if(err){
								error(err);
							}
							else{
								password(hash);
							}
						});
					
						function password(psw){
							password_reset = require('../../modules/eventEmitter.js').on();
							
							require('../../models/forget/password_reset.js').on(email, psw, user_id, token);
							
							password_reset.on('return', function(state){
								if(state[0]){
									session.infos = ["success", "Your password has been changed you can login with it !"];
									res.redirect("/");
								}
								else{
									error("Reseting your password failed !!");
								}
							});
						}
					}
				}
			}
			else{
				error("Invalid email adresse !!");
			}
		}
	}