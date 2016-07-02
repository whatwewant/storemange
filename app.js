var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var logger = require('morgan');

var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var path = require('path');
var fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();


// @ENV
var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    app.set('showStackErr', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

// @database
const DBURL = 'mongodb://localhost/store_management';
mongoose.connect(DBURL, function (err, db) {
    if (err) {
        console.log('\nError: MongoDB connect error');
        console.log('\t%s\n', err);
    }
});


// @models loading
var models_path = __dirname + '/app/models';
var walk = function (path) {
    fs
        .readdirSync(path)
        .forEach(function (file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)$/.test(file)) {
                    require(newPath);
                }
            } else if (stat.isDirectory()) {
                walk(newPath);
            }
        });
};
walk(models_path);


// @middlewares
//  -- system
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(multipart());
app.use(cookieParser());
app.use(session({
    secret: 'webapp-api',
    resave: false,
    saveUnintialized: true,
    store: new mongoStore({
        url: DBURL,
        collections: 'sessions',
    }),
}));
app.use(express.static(path.join(__dirname, 'public')));
// -- diy

// @
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.locals.moment = require('moment');

// @route
require('./config/route')(app);

// @server
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Server start at port ' + port);
    }
});
