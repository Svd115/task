	
	exports.on = function (req, res, session){
		if(session.infos.length < 1){
			infos = "";
		}
		else{
			infos = session.infos;
		}
		
		if(session.user && typeof session.user === 'number'){
			
			get_list = require('../../modules/eventEmitter.js').on();
			
			require('../../models/todo/read.js').on(session.user);
			
			get_list.on('return', function(task){
				res.render('../views/page.ejs', 
					{
						css : "todo_list.css",
						page : '../views/todo_list.html',
						task : task,
						notification : infos,
						javascript : "todo_list.js"
					}
				);
			});
			
		}
		else{
			res.render('../views/page.ejs', 
				{
					css : "login_signup.css",
					page : '../views/login_signup.html',
					notification : infos,
					javascript : "login_signup.js"
				}
			);
		}
		
		session.infos = [];
	}
	