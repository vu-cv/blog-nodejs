var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var Schema = mongoose.Schema;

//UserSchema
var CategoryModelSchema = new Schema({
	name: {
		type: String, 
		unique: true,
		required: true
	},
	slug: {
		type: String, 
		unique: true,
		required: true
	},
	parent_id: String,

	create_at: {
		type: Date, 
		default: Date.now()
	}
})

var CategoryModel = mongoose.model('categories', CategoryModelSchema);
//create users model
var CategoryriesAction = {
	getAll: () => CategoryModel.find().exec(),
	getById: id => CategoryModel.findById(id).exec(),
	store: (name, slug, parentId) => {
		CategoryModel.create({
			name: name,
			slug: slug,
			parent_id: parentId,
			create_at: Date.now()
		}, (err, result) => {
			 if (err) {
			 	console.log("\nInsert fail: " + err.message);
			 }else {
				console.log("\nInserted !");
			 }
		});
	},
	update: (id, name, slug, parentId) => CategoryModel.update({_id: id}, {
		name: name,
		slug: slug,
		parent_id: parentId,
	}).exec((err, result) => {
		if (err) {
		 	console.log("\nUpdate fail: " + err.message);
		 }else {
			console.log("\nUpdated !");
		 }
	}),
	destroy: id => CategoryModel.remove({_id: id}).exec((err, result) => {
		if (err) {
			console.log("Delete fail !");
		} else {
			console.log("Deleted !");
		}
	})
}


module.exports = CategoryriesAction;