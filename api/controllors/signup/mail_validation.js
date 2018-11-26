	exports.on = function (req, res, session, ent){
		
		var user_id = Number(ent.encode(req.params.id));
		var token = ent.encode(req.params.token);
		
		if(typeof user_id === "number"){
			
			mail_validation = require('../../modules/eventEmitter.js').on();
			
			require('../../models/signup/mail_validation.js').on(user_id, token);
			
			mail_validation.on('return', function(state){
				if(state[0]){
					session.infos = ["success", "Your account has been validate with success !! You can now login."];
					res.redirect('/');
				}
				else{
					error("Impossible to validate your account !!");
				}
			});
		}
		else{
			error("This url is incorrect !!");
		}
		
		function error(e){
			require("../../modules/error.js").on("danger", e, session, res);
		}
	}