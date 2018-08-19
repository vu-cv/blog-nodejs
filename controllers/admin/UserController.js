const UserModel = require('../../models/admin/UserModel');

var UserController = {
	getAll: () => UserModel.getAll(),
	getByName: name => UserModel.getByName(name),
	getById: id => UserModel.getById(id),
	addNew: (username, password, email, display_name, role, avatar) => UserModel.store(username, password, email, display_name, role, avatar),
	edit: (id, password, display_name, role, avatar) => UserModel.update(id, password, display_name, role, avatar),
	delete: id => UserModel.destroy(id)
}
module.exports = UserController;