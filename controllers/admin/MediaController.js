const MediaModel = require('../../models/admin/MediaModel');

module.exports = {
	getAll: () => MediaModel.getAll(),
	getById: id => MediaModel.getById(id),
	addNew: (name, slug, parentId) => MediaModel.store(name, slug, parentId),
	edit: (id, name, slug, parentId) => MediaModel.update(id, name, slug, parentId),
	delete: id => MediaModel.destroy(id)
}
