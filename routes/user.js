let express = require('express');
let router = express.Router();
let UserController = require('./controller/user');
router.get('/', (req, res) => {
    UserController.welcome(req, res);
});
router.post('/users', (req, res) => {
    UserController.createUser(req, res);
});
router.post('/users/generateOTP', (req, res) => {
    UserController.generateOTP(req, res);
});
router.get('/users/:userId/verifyOTP', (req, res) => {
    UserController.verifyOTP(req, res);
});
module.exports = router;