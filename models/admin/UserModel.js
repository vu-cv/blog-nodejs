var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var Schema = mongoose.Schema;

//UserSchema
var UserModelSchema = new Schema({
	user_login: {
		type: String, 
		unique: true,
		required: true
	},
	user_pass: {
		type: String,
		required: true
	},
	user_email: {
		type: String, 
		unique: true,
		required: true
	},
	display_name: {
		type: String,
		required: true
	},
	image_url: String,
	roles: {
		type: Number,
		required: true
	},
	user_registered: {
		type: Date, 
		default: Date.now()
	}
})

var UserModel = mongoose.model('users', UserModelSchema);
// var id = "5b767476ed226519b4544366";
//create users model
var UsersAction = {
	getAll: () => UserModel.find().exec(),
	getByName: name => UserModel.find({user_login: name}).exec(),
	getById: id => UserModel.findById(id).exec(),
	store: (username, password, email, name_display, role, avatar) => {
		UserModel.create({
			user_login: username,
			user_pass: password,
			user_email: email,
			display_name: name_display,
			roles: role,
			image_url: avatar,
			user_registered: Date.now()
		}, (err, result) => {
			 if (err) {
			 	console.log("\nInsert fail: " + err.message);
			 }else {
				console.log("\nInserted !");
			 }
		});
	},
	update: (id, password, email, name_display, role, avatar) => UserModel.update({_id: id}, {
		// user_login: username,
		user_pass: password,
		user_email: email,
		display_name: name_display,
		roles: role,
		image_url: avatar,
	}).exec((err, result) => {
		if (err) {
		 	console.log("\nUpdate fail: " + err.message);
		 }else {
			console.log("\nUpdated !");
		 }
	}),
	destroy: id => UserModel.remove({_id: id}).exec((err, result) => {
		if (err) {
			console.log("Delete fail !");
		} else {
			console.log("Deleted !");
		}
	})
}



module.exports = UsersAction;