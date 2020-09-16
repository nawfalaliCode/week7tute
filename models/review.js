let mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stars: {
        type: Number,
        required: true,
        validate: {
            validator: function (newStars) {
                return (newStars >= 1 && newStars <= 5);
            },
            message: 'Invalid stars'
        }
    },
    review: {
        type: String,
        required: true,
        set: setReview
    }

});

function setReview(newReview) {
    return newReview.substring(0, 10);
}

module.exports = mongoose.model('Review', reviewSchema);