let mongoose = require('mongoose');
let express = require('express');
let bodyParser = require('body-parser');
let productRouter = require('./routers/productrouter');
let reviewRouter = require('./routers/reviewrouter');


let print = console.log;


//configure Express

let app = express();

app.use(bodyParser.json());
app.use('/products', productRouter);
app.use('/reviews', reviewRouter);

app.listen(8080);




// configure DB
// http://www.google.com
let DB_URL = "mongodb://" + process.argv[2] + ":27017/week7tute";
mongoose.connect(DB_URL, function (err) {
    if (err) {
        print(err);
    } else {
        print("DB connection established");
    }
});


// Endpoints

app.get('/', (req, res) => {
    res.send('Thank you !!!');
});