	var express = require('express');
	app = express();
	var server = require('http').Server(app);
	var io = require('socket.io')(server);
	var ent = require('ent');
	var bodyParser = require('body-parser');
	var session = require('cookie-session');
	var urlencodedParser = bodyParser.urlencoded({ extended: true });
	
	var port = process.env.PORT;
	if (port == null || port == "") {
		port = 8000;
	}

	session.infos = [];
	session.user = false;
	
	app.use(session({secret: 'todotopsecret'}))
	.use(express.static(__dirname + '/public'))
	.get('/', function(req, res){
		require(__dirname + '/api/controllors/index/index.js').on(req, res, session);
	})
	.get('/signup/:id/:token', urlencodedParser, function(req, res){
		if(session.user){
			session.infos = ["danger", "You are already registred !!"];
			res.redirect('/');
		}
		else{
			require(__dirname + '/api/controllors/signup/mail_validation.js').on(req, res, session, ent);
		}
	})
	.get('/forget/:id/:token', urlencodedParser, function(req, res){
		if(session.user){
			session.infos = ["danger", "You are already connected !!"];
			res.redirect('/');
		}
		else{
			require(__dirname + '/api/controllors/forget/password_forget.js').on(req, res, session, ent);
		}
	})
	.post('/', urlencodedParser, function(req, res){
		if(typeof req.body.login !== 'undefined' && req.body.login === ''){
			require(__dirname + '/api/controllors/login/login.js').on(req, res, session, ent);
		}
		else if(typeof req.body.signup !== 'undefined' && req.body.signup === ''){
			require(__dirname + '/api/controllors/signup/signup.js').on(req, res, session, ent);
		}
		else if(typeof req.body.forget !== 'undefined' && req.body.forget === ''){
			require(__dirname + '/api/controllors/forget/forget.js').on(req, res, session, ent);
		}
		else if(typeof req.body.logout !== 'undefined' && req.body.logout === ''){
			require(__dirname + '/api/controllors/logout/logout.js').on(res, session);
		}
		else if(typeof req.body.create !== 'undefined' && req.body.create === ''){
			require(__dirname + '/api/controllors/todo/create.js').on(req, res, session, ent);
		}
		else if(typeof req.body.del !== 'undefined' && req.body.del === ''){
			require(__dirname + '/api/controllors/todo/delete.js').on(req, res, session, ent);
		}
		else if(typeof req.body.update !== 'undefined' && req.body.update === ''){
			require(__dirname + '/api/controllors/todo/update.js').on(req, res, session, ent);
		}
		else{
			res.redirect("/");
		}
	})
	.post('/reset/:id/:token', urlencodedParser, function(req, res){
		require(__dirname + '/api/controllors/forget/password_reset.js').on(req, res, session, ent);
	})
	.use(function(req, res, next){
		session.infos = ["danger", "This page doesn't exist !!"];
		res.redirect('/');
	});
	
	io.sockets.on('connection', function(socket){
		socket.on('new_task', function(task){
			
			ws_create = require(__dirname + '/api/modules/eventEmitter.js').on();
			
			require(__dirname + '/api/controllors/todo_socket/create.js').on(task, session.user, ent);
			
			ws_create.on('return', function(data){
				if(data[0]){
					socket.emit("new", [true, data[1], data[2]]);
				}
				else{
					socket.emit("new", [false]);
				}
			});
		});
		
		socket.on('update_task', function(task){
			ws_update = require(__dirname + '/api/modules/eventEmitter.js').on();
			
			require(__dirname + '/api/controllors/todo_socket/update.js').on(task[0], task[1], session.user, ent);
			
			ws_update.on('return', function(data){
				if(data[0]){
					socket.emit("update", [true, data[1], data[2]]);
				}
				else{
					socket.emit("update", [false]);
				}
			});
		});
		
		socket.on('delete_task', function(task){
			
			ws_delete = require(__dirname + '/api/modules/eventEmitter.js').on();
			
			require(__dirname + '/api/controllors/todo_socket/delete.js').on(task, session.user, ent);
			
			ws_delete.on('return', function(data){
				if(data[0]){
					socket.emit("delete", [true, data[1]]);
				}
				else{
					socket.emit("delete", [false]);
				}
			});
		});
		
	});


	
	server.listen(port);