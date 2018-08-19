const PostModel = require('../../models/admin/PostModel');

module.exports = {
	getAll: () => PostModel.getAll(),
	getById: id => PostModel.getById(id),
	addNew: (title, content, author, status, slug, image, category) => PostModel.store(title, content, author, status, slug, image, category),
	edit: (id, title, content, status, image, category) => PostModel.update(id, title, content, status, image, category),
	delete: id => PostModel.destroy(id),
}