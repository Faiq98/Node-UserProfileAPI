const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProfileSchema = new Schema({
    first_name: {type:String, required: true},
    last_name: {type:String, required: true},
    email: {type: String, unique: true, required: true},
    contacts:[{
        type: Schema.Types.ObjectId,
        ref: 'contact'
    }],
    password: {type: String, required: true}
});

module.exports = mongoose.model('user', ProfileSchema);