var express = require('express');
var router = express.Router();

const MEDIA_ROUTER = require('./media');
const USERS_ROUTER = require('./users');

router.use('/media', MEDIA_ROUTER);
router.use('/users', USERS_ROUTER);

module.exports = router;