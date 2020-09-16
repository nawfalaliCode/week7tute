let express = require('express');
let Review = require('../models/review');
let mongoose = require('mongoose');

let router = express.Router();


router.get('/', (req, res) => {
    Review.find({}).sort('stars').exec(function (err, data) {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    let reviewDetails = req.body;
    let review = new Review({
        _id: new mongoose.Types.ObjectId(),
        stars: reviewDetails.stars,
        review: reviewDetails.review
    });

    review.save(function (err, data) {
        res.json(data);
    });
});

router.delete('/', (req, res) => {
    Review.findByIdAndDelete({
        _id: req.body.id
    }, function (err, data) {
        res.json(data);
    })
})

module.exports = router;