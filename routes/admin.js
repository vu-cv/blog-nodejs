var router = require('express').Router();
var menu = require('../settings/menu');

router.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.render('admin/index', {title: "Dashboard", menu: menu});
	} else {
		res.writeHead(302, { 
		  'Location': '/login'
		});
		res.end();
	}
});

/*********** POST ROUTE ***********/
router.get('/posts', (req, res) => {
	var PostController = require('../controllers/admin/PostController');
	PostController.getAll().then(row => {
		// console.log(row);
		res.render('admin/post/list', {title: "All Posts", menu: menu, data: row});
	});
	// console.log("dm");
});

router.get('/posts/add', (req, res) => {
	res.render('admin/post/add', {title: "Add New Post", menu: menu});
});
router.post('/posts/add', (req, res) => {
	var PostController = require('../controllers/admin/PostController');
	PostController.addNew({
		post_title: req.body.title,
		post_content: req.body.content,
		post_category: req.body.category,
		post_author: 1,
		post_status: req.body.status,
		post_date: Date.now()
	});
	res.writeHead(302, { 
	  'Location': '/admin/posts'
	});
	res.end();
});

router.get('/posts/:id/edit', (req, res) => {
	var PostController = require('../controllers/admin/PostController');

	var id = req.params.id;
	// console.log(id);
	

	// var myquery = { _id: ObjectID("" + id) };
	// PostController.getById(id);
	PostController.getById(id).then(row => {
		console.log(row);
		res.render('admin/post/edit', {title: "Edit Posts", menu: menu, data: row});
	});
});


/*********** CATEGORY ROUTE ***********/
router.get('/posts/category', (req, res) => {
	res.render('admin/category/list', {title: "Categories", menu: menu});
});


/*********** COMMENT ROUTE ***********/
router.get('/comments', (req, res) => {
	res.end('comments');
});

/*********** MEDIA ROUTE ***********/
router.get('/media', (req, res) => {
	var MediaModel = require('../models/admin/MediaModel');
	var str = req.headers.host;
	str = 'http://' + str;
	MediaModel.getAll().then(row => {
		// console.log(row);
		res.render('admin/media', {title: "Media Library", menu: menu, data: row, hostName: str});
	})
});
router.get('/media/:id/delete', (req, res) => {
	var MediaModel = require('../models/admin/MediaModel');
	var id = req.params.id;
	

	var fs = require('fs');
	MediaModel.getById(id).then(row => {
		// console.log(row);
		fs.unlink('public'+row.path, function (err) {
		  	if (err) throw err;
		  	console.log('File deleted!');
			MediaModel.destroy(id);
		});
		
	});
	res.writeHead(302, { 
	  'Location': '/admin/media'
	});
	res.end();
});

/*********** USER ROUTE ***********/


module.exports = router;
