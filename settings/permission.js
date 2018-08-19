function AdministratorPermission (redirectUrl) {
    return function (req, res, next) {
        if (req.session.passport.user.roles === 0) {
            next();
        } else {
            res.writeHead(302, { 
			  'Location': ''+redirectUrl
			});
			res.end();
        }
    }
}
function SubAdminPermission (redirectUrl) {
    return function (req, res, next) {
        if (req.session.passport.user.roles <= 1) {
            next();
        } else {
            res.writeHead(302, { 
              'Location': ''+redirectUrl
            });
            res.end();
        }
    }
}
function UserPermission () {
    return function (req, res, next) {
        if (req.session.passport.user.roles === 2) {
            next();
        } else {
            res.writeHead(302, { 
              'Location': '/admin/302.html'
            });
            res.end();
        }
    }
}

module.exports = {AdministratorPermission, SubAdminPermission, UserPermission}