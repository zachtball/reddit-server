const Snoowrap = require('snoowrap');
const dotenv = require('dotenv');
const { verifyToken } = require('../utils/auth');
const { User } = require('../resources/user/user.model');

dotenv.config();

const snoo = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }
  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  User.findById(payload.id)
    .lean()
    .exec()
    .then((user) => {
      console.log({ user });
      req.r = new Snoowrap({
        userAgent: 'writeit',
        clientId: process.env.API_CLIENT_ID,
        clientSecret: process.env.API_SECRET_KEY,
        refreshToken: user.refresh_token,
      });
      next();
    });
};

module.exports = { snoo };
