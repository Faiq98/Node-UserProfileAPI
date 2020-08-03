const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/user', userController.user_all);
router.get('/user/:id', userController.user_details);
router.post('/user/signup', userController.user_signup);
router.put('/user/:id/update', userController.user_update);
router.delete('/user/:id/delete', userController.user_delete);

module.exports = router;