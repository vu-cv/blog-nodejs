const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-extend');
const SocketIOFileUpload = require('socketio-file-upload');
const app = express();
app.set('view engine', 'ejs');
app.engine('ejs', expressLayouts);
app.use(SocketIOFileUpload.router);
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(80);


// route group posts
const route = require('./routes/admin');
app.use('/admin', route);

//connect database

var db = require( './models/admin/connect_db' );
db.connectToServer( function( err ) {
  if (err) throw err;
  console.log("Database connected!");
} );
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