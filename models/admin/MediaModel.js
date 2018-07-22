var MediaModel = {
	getAll: () => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');
		var result = dbo.collection("media").find({}).toArray();
		return result;
	},
	getById: id => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');

		var ObjectID = require('mongodb').ObjectID;

		var result = dbo.collection("media").findOne({_id: ObjectID("" + id)});
		// console.log(result);
		return result;
	},

	insert: myobj => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');
		dbo.collection("media").insertOne(myobj, function(err, res) {
		    if (err) throw err;
		    console.log("1 document inserted");
	  	});
	},
	destroy: id => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');

		var ObjectID = require('mongodb').ObjectID;
		
		var myquery = { _id: ObjectID("" + id) };

		dbo.collection("media").deleteOne(myquery, function(err, obj) {
		    if (err) throw err;
		    console.log("1 document deleted");
	 	 });
	},

}

module.exports = MediaModel;