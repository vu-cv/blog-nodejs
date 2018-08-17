const UserModel = require('../../models/admin/UserModel');

var UserController = {
	// getAll: () => db.getAll(),
	// getById: id => db.getById(id),
	addNew: (username, password, email, display_name, avatar) => UserModel.store(username, password, email, display_name, avatar),
}

module.exports = UserController;