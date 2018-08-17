const CategoryModel = require('../../models/admin/CategoryModel');

module.exports = {
	getAll: () => CategoryModel.getAll(),
	getByName: name => CategoryModel.getByName(name),
	getById: id => CategoryModel.getById(id),
	addNew: (name, slug, parentId) => CategoryModel.store(name, slug, parentId),
	edit: (id, name, slug, parentId) => CategoryModel.update(id, name, slug, parentId),
	delete: id => CategoryModel.destroy(id)
}
