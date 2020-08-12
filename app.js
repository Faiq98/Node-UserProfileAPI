const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');
const contactRoute = require('./routes/contact.route');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

let dev_db_url = 'MongoDB URL';
const mongodb = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use('/api', userRoute, contactRoute);

let port = 3000;
app.listen(port, ()=>{
    console.log('Server is up and running on port '+port);
});