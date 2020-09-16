let express = require('express');
let Product = require('../models/product');
let mongoose = require('mongoose');

let router = express.Router();


router.get('/', (req, res) => {
    Product.find({}).populate('reviews').sort('name').exec(function (err, data) {
        res.json(data);
    });
});

router.post('/', (req, res) => {
    let productDetails = req.body;
    let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: productDetails.name,
        quantity: productDetails.quantity
    });

    product.save(function (err, data) {
        res.json(data);
    });
});

router.put('/:pid/:rid', (req, res) => {
    Product.findByIdAndUpdate({
        _id: req.params.pid
    }, {
        $push: {
            "reviews": mongoose.Types.ObjectId(req.params.rid)
        }
    }, {
        upsert: false
    }, function (err, data) {
        res.json(data);
    })
});

router.delete('/', (req, res) => {
    Product.findByIdAndDelete({
        _id: req.body.id
    }, function (err, data) {
        res.json(data);
    })
})

module.exports = router;