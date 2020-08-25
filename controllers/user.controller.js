const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

//display all user
// exports.user_all = function (req, res) {
//     userModel.find({}, function (err, user) {
//         if (err) return next(err);
//         res.send(user);
//     });
// }

exports.user_all = async (req, res) => {
    const users = await userModel.find({}).populate('contacts');

    try {
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
}

//display user details by id
// exports.user_details = function(req, res){
//     userModel.findById(req.params.id, function(err, user){
//         if(err) return next (err);
//         res.send(user);
//     });
// }

exports.user_details = async (req, res) => {
    const user = await userModel.findById(req.params.id).populate('contacts');

    try {
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

//create user
// exports.user_create = function(req, res){
//     let user = new userModel({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         age: req.body.age,
//         phone: req.body.phone
//     });

//     user.save(function(err){
//         if(err) return next(err);
//         res.send('User Successfully Create !');
//     });
// }

exports.user_signup = (req, res) => {
    userModel.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Email already exist!'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new userModel({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User Created'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}

//create user
// exports.user_reviews = function(req, res){
//     let user = new userModel({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         age: req.body.age,
//         phone: req.body.phone
//     });

//     user.save(function(err){
//         if(err) return next(err);
//         res.send('User Successfully Create !');
//     });
// }

exports.user_login = (req, res, next) => {
    userModel.find({ email: req.body.email }).populate('contacts')
        .exec()
        .then(user => { 
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth Failed!'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(201).json({
                        message: 'Auth Failed!'
                    });
                }
                if (result) {
                    return res.send(user);
                }
                res.status(401).json({
                    message: 'Auth Failed!'
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

//update user
// exports.user_update = function(req, res){
//     userModel.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, user){
//         if(err) return next(err);
//         res.send('Update Success');
//     });
// }

exports.user_update = async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);

    try {
        await user.save();
        res.status(200).json({
            message: 'Update Success'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}


//delete user
// exports.user_delete = function(req, res){
//     userModel.findByIdAndRemove(req.params.id, function(err, user){
//         if(err) return next(err);
//         res.send('User has been delete');
//     });
// }

exports.user_delete = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) res.status(404).send('User not found !');
        res.status(200).json({
            message: 'Deleted User'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}