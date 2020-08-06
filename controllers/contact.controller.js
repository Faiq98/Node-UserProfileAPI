const contactModel = require('../models/contact.model');
const userModel = require('../models/user.model');

exports.add_contacts = async (req, res) => {
    let contact = new contactModel ({
        phone_no: req.body.phone_no,
        type: req.body.type,
        plan: req.body.plan
    });

    try {
        await contact.save();
        const user = await userModel.findByIdAndUpdate(req.params.id, {$push: {contacts: contact}});
        res.send('Update Contact Success');
    } catch (err) {
        res.status(500).send(err);
    }
}