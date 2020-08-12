const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactSchema = new Schema({
    name: {type: String},
    phone_no: {type:String, unique: true},
    type: {type:String},
    plan: {type: String},
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('contact', ContactSchema);