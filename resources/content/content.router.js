const express = require('express');
const {
  getBest,
  getHotSubredditsPosts,
  getNewSubredditsPosts,
  getTopSubredditsPosts,
} = require('./content.controller');

const router = express.Router();

router.get('/best', getBest);
router.get('/m/hot/*', getHotSubredditsPosts);
router.get('/m/new/*', getNewSubredditsPosts);
router.get('/m/top/*/*', getTopSubredditsPosts);

module.exports = router;
