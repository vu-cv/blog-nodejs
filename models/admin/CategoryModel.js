var CategoryModel = {
	getAll: () => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');
		var result = dbo.collection("categories").find({}).toArray();
		return result;
	},
	getById: id => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');

		var ObjectID = require('mongodb').ObjectID;

		var result = dbo.collection("categories").findOne({_id: ObjectID("" + id)});
		// console.log(result);
		return result;
	},

	insert: myobj => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');
		dbo.collection("categories").insertOne(myobj, function(err, res) {
		    if (err) throw err;
		    console.log("1 document inserted");
	  	});
	},
}

module.exports = PostModel;