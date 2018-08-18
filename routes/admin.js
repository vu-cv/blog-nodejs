var router = require('express').Router();
var menu = require('../settings/menu');
router.get('/', (req, res) => {
		res.render('admin/index', {title: "Dashboard", menu: menu, userLogin: req._passport.session.user});
});

/*********** POST ROUTE ***********/
router.get('/posts', (req, res) => {
	var PostController = require('../controllers/admin/PostController');
	PostController.getAll().then(row => {
		// console.log(row);
		res.render('admin/post/list', {title: "All Posts", menu: menu, userLogin: req._passport.session.user, data: row});
	});
	// console.log("dm");
});

router.get('/posts/add', (req, res) => {
	var CategoryController = require('../controllers/admin/CategoryController');
	
	res.render('admin/post/add', {title: "Add New Post", menu: menu, userLogin: req._passport.session.user});
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
	// res.writeHead(302, { 
	//   'Location': '/admin/posts'
	// });
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
		res.render('admin/post/edit', {title: "Edit Posts", menu: menu, userLogin: req._passport.session.user, data: row});
	});
});


/*********** CATEGORY ROUTE ***********/
router.get('/posts/category', (req, res) => {
	var CategoryController = require('../controllers/admin/CategoryController');
	CategoryController.getAll().then(row => {
		
		res.render('admin/category/list', {title: "Categories", data: row, menu: menu, userLogin: req._passport.session.user});
	})
});
router.get('/posts/category/:id/edit', (req, res) => {
	var CategoryController = require('../controllers/admin/CategoryController');
	CategoryController.getAll().then(rows => {
		CategoryController.getById(req.params.id).then(row => {

			res.render('admin/category/edit', {title: "Edit Category", currentCat: row , data: rows, menu: menu, userLogin: req._passport.session.user});
		});
	});
});
router.get('/posts/category/:id/delete', (req, res) => {
	var CategoryController = require('../controllers/admin/CategoryController');
	CategoryController.delete(req.params.id);

	res.writeHead(302, {
		'Location': '/admin/posts/category'
	});
	res.end();
});


router.post('/posts/category', (req, res) => {
	var CategoryController = require('../controllers/admin/CategoryController');
	var name = req.body.name;
	var slug = req.body.slug
	var parentId = req.body.parentId;
	CategoryController.addNew(name, slug, parentId);

	res.writeHead(302, { 
	  'Location': '/admin/posts/category'
	});
	res.end();
})


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
		res.render('admin/media', {title: "Media Library", menu: menu, userLogin: req._passport.session.user, data: row, hostName: str});
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
router.get('/users', (req, res) => {
	
	var UserController = require('../controllers/admin/UserController');
	
	UserController.getAll().then(row => {
		res.render('admin/user/list', {title: "Users", menu: menu, userLogin: req._passport.session.user, data: row});
		// console.log(row);
	});
})

router.get('/users/add', (req, res) => {
	res.render('admin/user/add', {title: "Add New User", menu: menu, userLogin: req._passport.session.user});
})

router.post('/users/add', (req, res) => {
	// console.log(req.body);
	var UserController = require('../controllers/admin/UserController');
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var display_name = req.body.displayName;
	var role = Number(req.body.roles);
	UserController.addNew(username, password, email, display_name, role, "...");

	res.writeHead(302, { 
	  'Location': '/admin/users'
	});
	res.end();
})

router.get('/users/:id/edit', (req, res) => {
	var UserController = require('../controllers/admin/UserController');
	var id = req.params.id;
	UserController.getById(id).then(row => {
		res.render('admin/user/edit', {title: "Edit User", menu: menu, userLogin: req._passport.session.user, data: row});
	})
})

router.post('/users/:id/edit', (req, res) => {
	// console.log(req.body);
	var UserController = require('../controllers/admin/UserController');
	var id = req.body.id;
	// var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var display_name = req.body.displayName;
	var role = Number(req.body.roles);
	UserController.edit(id, password, email, display_name, role, "...");

	res.writeHead(302, { 
	  'Location': '/admin/users'
	});
	res.end();
})
router.get('/users/:id/delete', (req, res) => {
	// console.log(req.body);
	var UserController = require('../controllers/admin/UserController');
	var id = req.params.id;
	UserController.delete(id);

	res.writeHead(302, { 
	  'Location': '/admin/users'
	});
	res.end();
})

router.get('/test', (req, res) => {


})
module.exports = router;
