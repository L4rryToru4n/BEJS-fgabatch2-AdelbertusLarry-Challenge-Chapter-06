var express = require('express');
var router = express.Router();
const user = require('../../../controllers/users.controller');

/* GET users listing. */
router.get('/', user.getUsers);
router.get('/:id', user.getUser);
router.post('/create', user.createUser);

module.exports = router;
