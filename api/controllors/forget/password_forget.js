	exports.on = function (req, res, session, ent){
		// L'user a cliqué sur lien pour reinitialiser psw, on verifie que l'id et le token sont bien valides avant d'afficher formulaire
		var user_id = Number(ent.encode(req.params.id));
		var token = ent.encode(req.params.token);
		
		if(typeof user_id === "number"){
			
			password_forget = require('../../modules/eventEmitter.js').on();
			
			require('../../models/forget/password_forget.js').on(user_id, token);
			
			password_forget.on('return', function(state){
				if(state[0]){
					res.render('../views/page.ejs', 
						{
							css : "login_signup.css",
							page : "../views/password_forget.html",
							form_action : "/reset/"+user_id+"/"+token,
							javascript : "password_forget.js"
						}
					);
				}
				else{
					error("Impossible to allow you to access reset your password !!");
				}
			});
		}
		else{
			error("This url is incorrect !!");
		}
		
		function error(){
			require("../../modules/error.js").on("danger", "Impossible to validate your email !! Be sure url params are valide.", session, res);
		}
	}