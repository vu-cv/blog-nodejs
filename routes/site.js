var router = (app) => {
	var PostController = require('../controllers/admin/PostController');
	var UserController = require('../controllers/admin/UserController');

	app.get('/', (req, res) => {

		PostController.getAll().then(rows => {
			PostController.getLimit().then(RecentPosts => {
				UserController.getAll().then(users => {
					res.render('site/home', {data: {title: "Trang chủ", rows, RecentPosts, users}});
				});
			});
			rows.forEach(row => {
				app.get('/' + row.post_slug, (req, res) => {
					PostController.getLimit().then(RecentPosts => {
						res.render('site/post-detail', {data: {title : row.post_title, row, RecentPosts}});
					})

				})
			});
		});
	})
	app.get('/post-detail', (req, res) => {

		res.render('site/post-detail', {data: {title: "Chi tiết bài viết"}});
	});
	
	//logout
	app.get('/logout', (req, res) => {
	    req.logout();
	    res.redirect('/login');
	});


}


module.exports = router;