	exports.on = function (){
		
		var token = "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
		token = token.repeat(60);
		
		token = token.split('').sort(function(a,b){
			return (7 - (Math.random()+'')[5]);
		}).join('');
		token = token.substring(0,60);
		
		return token;
	}
	