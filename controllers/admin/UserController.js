const db = require('../../models/admin/UserModel');

var UserController = {
	getAll: () => db.getAll(),
	getById: id => db.getById(id),
	addNew: myobj => db.insert(myobj),
}

module.exports = UserController;