const request = require('request');
const Snoowrap = require('snoowrap');
const { User } = require('./user.model');
const dotenv = require('dotenv');
const { newToken } = require('../../utils/auth');
dotenv.config();

const authenticateMe = (req, res, next) => {
  const { code, redirect_uri } = req.body;
  request.post(
    {
      url: 'https://www.reddit.com/api/v1/access_token',
      auth: {
        user: process.env.API_CLIENT_ID,
        password: process.env.API_SECRET_KEY,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      form: { grant_type: 'authorization_code', code, redirect_uri },
    },
    (err, _, body) => {
      if (err) {
        console.log({ err });
        next(err);
        return;
      }
      const parsedBody = JSON.parse(body);
      if (!parsedBody.error) {
        const r = new Snoowrap({
          userAgent: 'writeit',
          clientId: process.env.API_CLIENT_ID,
          clientSecret: process.env.API_SECRET_KEY,
          refreshToken: parsedBody.refresh_token,
        });
        r.getMe()
          .then((rRes) => {
            User.findOneAndUpdate(
              { username: rRes.name },
              {
                access_token: parsedBody.access_token,
                refresh_token: parsedBody.refresh_token,
              },
              { upsert: true, returnNewDocument: true }
            )
              .lean()
              .exec()
              .then((user) => {
                // if (user) {

                // }
                // if (!user) {
                //   try {
                //     User.create({
                //       user_name: rRes.name,
                //       access_token: parsedBody.access_token,
                //       refresh_token: parsedBody.refresh_token,
                //     });
                //   } catch (e) {
                //     console.error(e);
                //     res.status(400).end();
                //   }
                // }
                res.status(200).json(newToken(user._id));
              });
          })
          .catch((err) => console.log('init auth', err));
      }
    }
  );
};

const getMe = (req, res) => {
  req.r.getMe().then((snooRes) => {
    res.send(snooRes);
  });
};

module.exports = { authenticateMe, getMe };
