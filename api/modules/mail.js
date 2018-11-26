	exports.on = function(receiver, content, subject){
		var mail = "<div><h1>Email from todo list</h1>"+content+"</div>";
		
		var SparkPost = require('sparkpost');
		var sparky = new SparkPost(); // uses process.env.SPARKPOST_API_KEY

		sparky.transmissions.send({
			options: {
				sandbox: true
			},
			content: {
				from: 'testing@' + process.env.SPARKPOST_SANDBOX_DOMAIN, // 'testing@sparkpostbox.com'
				subject: subject,
				html: mail
			},
			recipients: [
				{address: receiver}
			]
		})
	}
	