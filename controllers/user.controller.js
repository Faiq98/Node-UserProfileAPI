const userModel = require('../models/user.model');

//display all user
exports.user_all = function (req, res) {
    userModel.find({}, function (err, user) {
        if (err) return next(err);
        res.send(user);
    });
}

//display user details by id
exports.user_details = function(req, res){
    userModel.findById(req.params.id, function(err, user){
        if(err) return next (err);
        res.send(user);
    });
}

//create user
exports.user_create = function(req, res){
    let user = new userModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        phone: req.body.phone
    });

    user.save(function(err){
        if(err) return next(err);
        res.send('User Successfully Create !');
    });
}

//update user
exports.user_update = function(req, res){
    userModel.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, user){
        if(err) return next(err);
        res.send('Update Success');
    });
}


//delete user
exports.user_delete = function(req, res){
    userModel.findByIdAndRemove(req.params.id, function(err, user){
        if(err) return next(err);
        res.send('User has been delete');
    });
}