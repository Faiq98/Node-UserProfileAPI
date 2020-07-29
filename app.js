const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');
const app = express();
const mongoose = require('mongoose');

let dev_db_url = '<MongoDB URL>';
const mongodb = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', userRoute);

let port = 3000;
app.listen(port, ()=>{
    console.log('Server is up and running on port '+port);
});