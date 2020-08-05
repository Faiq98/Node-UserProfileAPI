const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactSchema = new Schema({
    phone_no: {type:String, unique: true},
    type: {type:String},
    plan: {type: String}
});

module.exports = mongoose.model('contact', ContactSchema);