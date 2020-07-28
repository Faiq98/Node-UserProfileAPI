const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProfileSchema = new Schema({
    first_name: {type:String, required: true},
    last_name: {type:String, required: true},
    age: {type:Number, required: true},
    phone: {type:String}
});

module.exports = mongoose.model('user', ProfileSchema);