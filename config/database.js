	
	exports.on = function (req){
		const pg = require('pg');
		const connectionString = process.env.DATABASE_URL || 'postgres://postgres:untersagen164281@localhost:5432/task';
		
		return new pg.Client(connectionString);
	}
	