const express = require('express');
const router = express.Router();

const auth_controllers = require('../controllers/auth');
const validator = require('./validator');

router.post('/signup', validator.validator, auth_controllers.signup);
router.post('/signin', validator.validator, auth_controllers.signin);
router.post('/verify', validator.validator, auth_controllers.verify);
router.post('/withGoogle', validator.validator, auth_controllers.withGoogle);

router.post('/update/avatar', validator.validator, auth_controllers.changeAvatar);

module.exports = router;