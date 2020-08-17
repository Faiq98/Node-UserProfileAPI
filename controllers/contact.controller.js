const contactModel = require('../models/contact.model');
const userModel = require('../models/user.model');

exports.add_contacts = async (req, res) => {
    let contact = new contactModel({
        name: req.body.name,
        phone_no: req.body.phone_no,
        type: req.body.type,
        plan: req.body.plan
    });

    try {
        await contact.save();
        const user = await userModel.findByIdAndUpdate(req.params.id, { $push: { contacts: contact } });
        res.status(200).json({
            message: 'Add new Contact'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

exports.update_contacts = async (req, res) => {
    const contact = await contactModel.findByIdAndUpdate(req.params.id, req.body);
    console.log(contact);

    try {
        await contact.save();
        res.status(200).json({
            message: 'Update Success'
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

exports.delete_contacts = async (req, res) => {
    try {
        const contact = await contactModel.findByIdAndDelete(req.params.id);

        if (!contact) {
            res.status(404).json({
                message: 'User not found!'
            });
        } else {
            res.status(200).json({
                message: 'Delete contacts'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}