// var sql =  require('mssql');

// var config = {
// 	user:'root',
// 	password:'root',
// 	server:'localhost',
// 	database:'zp',
// 	port: 3306,
// 	pool: {
// 	  min: 0,
// 	  max: 10,
// 	  idleTimeoutMillis: 3000
// 	},
// 	options: {
// 		encrypt: false,
// 		  enableArithAbort: true// Use this if you're on Windows Azure
// 	},	
// }

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'zp'
});
 
connection.connect();


var db = {};
db.cc = async function(sqls, callback){
	try{
		await connection.query(sqls, (err, res, fields) => {
			callback(res)
		})		
	}catch(err){
		console.log(err);
	}
	
}
module.exports = db;
