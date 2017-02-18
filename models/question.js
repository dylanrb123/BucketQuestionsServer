/**
 * Created by Dylan on 2/16/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    bucket_id: String,
    text: String,
    owner: Number
});

module.exports = mongoose.model('Question', QuestionSchema);
