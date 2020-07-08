var router = require('express').Router();
const authController = require('../controllers/auth.controller');
const user_controller = require('../controllers/user.controller');

router.post('/signup',[authController.signupUser]);
router.get('/get_all',[user_controller.getUsers]);
module.exports = router;