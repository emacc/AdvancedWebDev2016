var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    startDate: String,
    jobTitle: String,
    salary: Number
});


var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;