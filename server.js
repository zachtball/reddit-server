const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./resources/user/user.router');
const { authenticateMe } = require('./resources/user/user.controller');
const { snoo } = require('./middleware');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.post('/api/user/authenticate', authenticateMe);
// adds snoowrap to the req object
app.use(snoo);
app.use('/api/user', userRouter);

// TODO: delete
app.get('/api/swag', (req, res, next) => {
  console.log(req.r);
  req.r
    .getSubscriptions({ limit: 300 })
    .then((r) => res.send(r.map((subs) => subs.display_name_prefixed)))
    .catch((err) => res.send(err));
});

const uri = process.env.ATLAS_URI;
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection
  .once('open', () => {
    console.log('mongodb connected successfully');
  })
  .catch((err) => {
    console.log(`couldn't connect to mongo, err: ${err}`);
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
