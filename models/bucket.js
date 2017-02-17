/**
 * Created by Dylan on 2/16/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BucketSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Bucket', BucketSchema);
