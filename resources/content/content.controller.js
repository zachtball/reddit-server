const getBest = (req, res, next) => {
  req.r
    .getBest()
    .then((snooRes) => {
      res.send(snooRes);
    })
    .catch(next);
};

const getHotSubredditsPosts = (req, res, next) => {
  const subreddits = req.url.split('/').slice(2)[1];
  req.r
    .getSubreddit(subreddits)
    .getHot()
    .then((snooRes) => res.send(snooRes))
    .catch(next);
};

const getNewSubredditsPosts = (req, res, next) => {
  const subreddits = req.url.split('/').slice(2)[1];
  req.r
    .getSubreddit(subreddits)
    .getNew()
    .then((snooRes) => res.send(snooRes))
    .catch(next);
};

const getTopSubredditsPosts = (req, res, next) => {
  const subsAndType = req.url.split('/').slice(2);
  const subreddits = subsAndType[1];
  const time = subsAndType[2] || 'day';
  req.r
    .getSubreddit(subreddits)
    .getTop({ time })
    .then((snooRes) => res.send(snooRes))
    .catch(next);
};

module.exports = {
  getBest,
  getHotSubredditsPosts,
  getNewSubredditsPosts,
  getTopSubredditsPosts,
};
