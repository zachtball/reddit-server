const getBest = (req, res, next) => {
  req.r.getBest().then((snooRes) => {
    res.send(snooRes);
  }).catch(err => next(err));
};

module.exports = { getBest };
