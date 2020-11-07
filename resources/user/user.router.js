const express = require('express');
const { getMe } = require('./user.controller');

const router = express.Router();

router.get('/me', getMe);

module.exports = router;
