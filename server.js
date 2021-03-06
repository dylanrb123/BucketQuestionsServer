/**
 * Created by Dylan on 2/16/2017.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bucket = require('./models/bucket');
var Question = require('./models/question');


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

// Bucket endpoints
router.route('/buckets')
    .post(function(req, res) {
        var bucket = new Bucket();
        bucket.name = req.body.name;
        bucket.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Bucket created!'} );
        })
    })
    .get(function(req, res) {
        Bucket.find(function(err, buckets) {
            if (err) {
                res.send(err);
            }
            res.json(buckets);
        })
    });

router.route('/buckets/:bucket_id')
    .get(function(req, res) {
        Bucket.findById(req.params.bucket_id, function(err, bucket) {
            if (err) {
                res.send(err);
            }
            res.json(bucket);
        })
    })
    .put(function (req, res) {
        Bucket.findById(req.params.bucket_id, function(err, bucket) {
            if (err) {
                res.send(err);
            }

            bucket.name = req.body.name;
            bucket.save(function(err) {
                if (err) {
                    res.send(err)
                }
                res.json("Updated bucket name")
            })
        })
    })
    .delete(function (req, res) {
        Bucket.remove({
            _id: req.params.bucket_id
        }, function (err, bucket) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted bucket' })
        })
    });

router.route('/questions')
    .post(function (req, res) {
        var question = new Question();
        question.bucket_id = req.body.bucket_id;
        question.text = req.body.text;
        question.owner = req.body.owner;
        question.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json("Message created!")
        })
    })
    .get(function (req, res) {
        Question.find(function (err, buckets) {
            if (err) {
                res.send(err);
            }
            res.json(buckets)
        })
    });

router.route('/questions/:question_id')
    .get(function (req, res) {
        Question.findById(req.params.question_id, function (err, question) {
            if (err) {
                res.send(err);
            }
            res.json(question)
        })
    })
    .put(function (req, res) {
        Question.findById(req.params.question_id, function(err, question) {
            if (err) {
                res.send(err);
            }
            // only the owner should be able to change the question
            if (question.owner.toString() === req.body.owner) {
                console.log('owner matches');
                question.text = req.body.text;
            }
            question.save(function(err) {
                if (err) {
                    res.send(err)
                }
                res.json("Updated question text")
            })
        })
    })
    .delete(function (req, res) {
        Question.findById(req.params.question_id, function(err, question) {
            if (err) {
                res.send(err);
            }
            // only the owner should be able to delete questions
            if (question.owner.toString() === req.body.owner) {
                Question.remove({
                    _id: req.params.question_id
                }, function (err, question) {
                    if (err) {
                        res.send(err);
                    }
                    res.json("Successfully deleted question")
                })
            }
        })
    });

app.use('/api', router);

app.listen(port);
console.log('It\'s all happening on port ' + port);

// DB crap
var dbCredetials = require('./db_credentials.json');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var user = dbCredetials.user;
var pass = dbCredetials.pass;
var dbName = dbCredetials.name;
mongoose.connect('mongodb://' + user + ':' + pass + '@ds145208.mlab.com:45208/' + dbName);

