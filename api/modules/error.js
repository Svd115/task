	exports.on = function (level, error, session, res){
		session.infos = [level, error];
		res.redirect('/');
	}