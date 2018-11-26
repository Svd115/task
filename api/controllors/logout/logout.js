	
	exports.on = function(res, session){
		session.user = false;
		res.redirect("/");
	}