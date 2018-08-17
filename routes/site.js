var router = (app) => {
	//logout
	app.get('/logout', (req, res) => {
	    req.logout();
	    res.redirect('/login');
	})
}


module.exports = router;