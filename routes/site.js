var router = (app) => {


	app.get('/', (req, res) => {
		res.render('site/home', {data: {title: "Trang chủ"}});
	})
	app.get('/post-detail', (req, res) => {
		res.render('site/post-detail', {data: {title: "Chi tiết bài viết"}});
	})

	//logout
	app.get('/logout', (req, res) => {
	    req.logout();
	    res.redirect('/login');
	});


}


module.exports = router;