const express = require('express');
const { getBest } = require('./content.controller');

const router = express.Router();

router.get('/best', getBest);

module.exports = router;
