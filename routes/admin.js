var router = require('express').Router();
var menu = require('../settings/menu');

router.get('/', (req, res) => {
	res.render('admin/index', {title: "Dashboard", menu: menu});
});

/*********** POST ROUTE ***********/
router.get('/posts', (req, res) => {
	var PostController = require('../controllers/admin/PostController');
	PostController.getAll.then(row => {
		// console.log(row);
		res.render('admin/all_post', {title: "All Posts", menu: menu, data: row});
	});
});

router.get('/posts/add', (req, res) => {
	res.render('admin/add_post', {title: "Add New Post", menu: menu});
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
		res.render('admin/edit_post', {title: "Edit Posts", menu: menu, data: row});
	});
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


module.exports = router;
