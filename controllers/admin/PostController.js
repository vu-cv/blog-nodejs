const PostModel = require('../../models/admin/PostModel');

module.exports = {
	getAll: () => PostModel.getAll(),
	getById: id => PostModel.getById(id),
	addNew: (title, content, author, status, slug, image) => PostModel.store(title, content, author, status, slug, image),
	edit: (id, title, content, author, status, slug, image) => PostModel.store(id, title, content, author, status, slug, image),
	delete: id => PostModel.destroy(id),
}