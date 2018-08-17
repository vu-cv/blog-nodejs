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
	display_name: String,
	image_url: String,
	user_registered: {
		type: Date, 
		default: Date.now()
	}
})

var UserModel = mongoose.model('users', UserModelSchema);

//create users model
var UsersAction = {
	store: (username, password, email, name_display, avatar) => {
		UserModel.create({
			user_login: username,
			user_pass: password,
			user_email: email,
			display_name: name_display,
			image_url: avatar,
			user_registered: Date.now()
		}, (err, result) => {
			 if (err) {
			 	console.log("\nInsert fail: " + err.message);
			 }else {
				console.log("\nInserted !");
			 }
		});
	}
}

// UserModel.find().exec((err, result) => {
// 	console.log(result);
// })

//param1: find, param2: edit
// UserModel.update({user_login: "hello"}, {user_login: "xin chao"}).exec((err, result) => {
// 	console.log(result);
// })

// UserModel.remove({user_login: "hello2"}).exec((err, result) => {
// 	console.log(result);
// })

module.exports = UsersAction;