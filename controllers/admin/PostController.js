const PostModel = require('../../models/admin/PostModel');
var limit = 3;
module.exports = {
	getAll: () => PostModel.getAll(),
	getLimit: () => PostModel.getLimit(limit),
	getById: id => PostModel.getById(id),
	addNew: (title, content, description, author, status, slug, image, category) => PostModel.store(title, content, description, author, status, slug, image, category),
	edit: (id, title, content, description, status, image, category) => PostModel.update(id, title, content, description, status, image, category),
	delete: id => PostModel.destroy(id),
}