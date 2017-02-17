/**
 * Created by Dylan on 2/16/2017.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Routes
var router = express.Router();

// gets called on every server request
router.use(function(req, res, next) {
    console.log('Something is happening');
    next();
});

router.get('/', function (req, res) {
    res.json({ message: 'it\'s haaaappppeeeeennnnniiiinnnnggggg' })
});

app.use('/api', router);

app.listen(port);
console.log('It\'s all happening on port ' + port);

// DB crap
var dbCredetials = require('./db_credentials.json');
var mongoose = require('mongoose');
var user = dbCredetials.user;
var pass = dbCredetials.pass;
var dbName = dbCredetials.name;
mongoose.connect('mongodb://' + user + ':' + pass + '@ds145208.mlab.com:45208/' + dbName);

var Bucket = require('./models/bucket');
