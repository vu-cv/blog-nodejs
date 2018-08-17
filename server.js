const express = require('express');
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-extend');
const session = require('express-session');
const SocketIOFileUpload = require('socketio-file-upload');
const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', expressLayouts);
app.use(SocketIOFileUpload.router);
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: "mysecret",
    // cookie: {
    //     maxAge: 1000*60*5
    // }

}));
app.use(Passport.initialize());
app.use(Passport.session());
// app.use(flash());
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 80);

//connect database
var dbc = require( './models/admin/connect_db' );
dbc.connectToServer( function( err ) {
  if (err) throw err;
  console.log("Database connected!");
});


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";





app.route('/login')
.get((req, res) => {
    res.render('admin/login');
    // console.log(req.flash('error'));
})
.post(Passport.authenticate('local', {
    failureRedirect: '/login', 
    successRedirect: '/admin',
}));
//Login Local
Passport.use(new LocalStrategy (
    (username, password, done) => {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("blog");
          dbo.collection("users").find({ user_login: username }).toArray((err, result) => {
            if (err) throw err;
            if (result[0] == undefined) {
                return done(null, false, {message: 'Không tồn tại user'});
            } else if(result[0].user_login == username && result[0].user_pass == password) {
                return done(null, result[0]);
            } else {
                return done(null, false);
            }
          });
        });
    }
))

Passport.serializeUser((user, done) => {
    done(null, user);
});
Passport.deserializeUser((user, done) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("blog");
      dbo.collection("users").find({ user_login: user.user_login }).toArray((err, result) => {
        if (err) throw err;
        if (result[0] == undefined) {
                return done(null, false);
        } else if(result[0].user_login == user.user_login) {
            return done(null, result[0].user_login == user.user_login);
        } else {
            return done(null, false);
        }
      });
    });
})

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.writeHead(302, { 
          'Location': '/logout'
        });
        res.end();
    }

}

// route group admin
const route = require('./routes/admin');
app.use('/admin', isAuthenticated, route);


const routeSite = require('./routes/site');
routeSite(app);

// const routeAuth = require('./routes/auth');
// routeAuth(app, Passport);




var media = require('./models/admin/MediaModel');

io.on("connection", function(socket){
    var uploader = new SocketIOFileUpload();
    uploader.dir = "./public/upload";
    uploader.listen(socket);
    // console.log("1 client connect", socket.id);

    uploader.on("saved", function(image){
        console.log("saved!");
        // console.log(image.file);
        var fileUrl = image.file.pathName.split('\\').join('/');
        fileUrl = fileUrl.substring(6, fileUrl.length);
        media.insert({name: image.file.name, path: fileUrl, size: image.file.size});

        io.sockets.emit('server-send-image-new-upload', fileUrl);
    });
});