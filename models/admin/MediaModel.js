var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var Schema = mongoose.Schema;

//UserSchema
var MediaModelSchema = new Schema({
	name: {
		type: String, 
		unique: true,
		required: true
	},
	path: {
		type: String, 
		unique: true,
		required: true
	},
	size: {
		type: String, 
		unique: true,
		required: true
	},
	

	upload_time: {
		type: Date, 
		default: Date.now()
	}
})

var MediaModel = mongoose.model('media', MediaModelSchema);
//create users model
var MediaAction = {
	getAll: () => MediaModel.find().exec(),
	getById: id => MediaModel.findById(id).exec(),
	store: (name, path, size) => {
		MediaModel.create({
			name: name,
			path: path,
			size: size,
			create_at: Date.now()
		}, (err, result) => {
			 if (err) {
			 	console.log("\nInsert fail: " + err.message);
			 }else {
				console.log("\nInserted !");
			 }
		});
	},
	update: (id, name, path, size) => MediaModel.update({_id: id}, {
		name: name,
		path: path,
		size: size,
	}).exec((err, result) => {
		if (err) {
		 	console.log("\nUpdate fail: " + err.message);
		 }else {
			console.log("\nUpdated !");
		 }
	}),
	destroy: id => MediaModel.remove({_id: id}).exec((err, result) => {
		if (err) {
			console.log("Delete fail !");
		} else {
			console.log("Deleted !");
		}
	})
}


module.exports = MediaAction;