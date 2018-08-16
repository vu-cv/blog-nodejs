const db = require('../../models/admin/PostModel');

var PostController = {
	getAll: () => db.getAll(),
	getById: id => db.getById(id),
	addNew: myobj => db.insert(myobj),
}

module.exports = PostController;