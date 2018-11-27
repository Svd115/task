	exports.on = function (req, res, session, ent){
		// User a cliqué sur 'psw oublié' et soumis son email, on créé un token puis on l'enregistre ds la bdd correspondant à cet email puis envoi email pour réinitaliser mdp
		
		var email = ent.encode(req.body.email);

		if(/^\s*$/.test(email)){
			error("Email required !!");
		}
		else{
			if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
				forget = require('../../modules/eventEmitter.js').on();
				
				require('../../models/forget/forget.js').on(email);
				
				forget.on('return', function(data){
					if(data[0]){
						var content = 
						"<p>In order to reset your password please click on this link : </p><a href='"+req.protocol+"://"+req.hostname+"/forget/"+data[1]+"/"+data[2]+"'>Reset my password</a>";
						
						require('../../modules/mail.js').on(email, content, "Reset your password");
						
						session.infos = ["success", "We have registered your request !! Please check your email to reset your password."];
						res.redirect("/");
					}
					else{
						error("Reseting your password failed !!");
					}
				});
			}
			else{
				error("Invalid email adresse !!");
			}
		}
	
		function error(e){
			require("../../modules/error.js").on("danger", e, session, res);
		}
	}