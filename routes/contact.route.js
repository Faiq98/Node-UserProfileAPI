const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact.controller');

router.post('/contact/:id/create', contactController.add_contacts);
router.delete('/contact/:id/delete', contactController.delete_contacts);

module.exports = router;