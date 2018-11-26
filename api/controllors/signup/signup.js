	exports.on = function (req, res, session, ent){
		const bcrypt = require('bcrypt');
		
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
								signup(hash);
							}
						});
					
						function signup(psw){
							get_signup = require('../../modules/eventEmitter.js').on();
							
							require('../../models/signup/signup.js').on(email, psw);
							
							get_signup.on('return', function(data){
								if(data[0]){
									//message invitant user à confirmer son inscription en checkant email, envoi email puis redirect vers /
									
									var content = 
									"<p>In order to validate your account please click on this link : </p><a href='http://signup/"+data[1]+"/"+data[2]+"' rel='nofollow'>Confirm my account</a>";
									
									require('../../modules/mail.js').on(email, content, "Confirmation of your account");
									
									session.infos = ["success", "Your account has been created with success !! Please check your email to validate it."];
									res.redirect("/");
								}
								else{
									error("This email is not available !!");
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
	
		function error(e){
			require("../../modules/error.js").on("danger", e, session, res);
		}
	}
	