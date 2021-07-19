const express = require('express');
const { getMe, getSubscriptions } = require('./user.controller');

const router = express.Router();

router.get('/me', getMe);
router.get('/subreddits', getSubscriptions);

module.exports = router;
