var router = (app) => {
	var PostController = require('../controllers/admin/PostController');


	app.get('/', (req, res) => {
		PostController.getAll().then(rows => {
			console.log(rows);
			res.render('site/home', {data: {title: "Trang chủ", rows}});
		});
	})
	app.get('/post-detail', (req, res) => {
		res.render('site/post-detail', {data: {title: "Chi tiết bài viết"}});
	});

	//create breadcrum post detao;

	PostController.getAll().then(rows => {
		rows.forEach(row => {
			app.get('/' + row.post_slug, (req, res) => {
				res.end(""+row.post_slug);

			})
		});
	});
	//logout
	app.get('/logout', (req, res) => {
	    req.logout();
	    res.redirect('/login');
	});


}


module.exports = router;