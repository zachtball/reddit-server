const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    access_token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    refresh_token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// userSchema.pre('save', (next) => {
//   if (!this.isModified('refresh_token')) {
//     return next();
//   }

//   bcrypt.hash(this.refresh_token, 8, (err, hash) => {
//     if (err) {
//       return next(err);
//     }

//     this.refresh_token = hash;
//     next();
//   });
// });

// userSchema.methods.checkRefreshToken = function(newToken) {
//   const { refresh_token } = this;
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(newToken, refresh_token, (err, same) => {
//       if (err) {
//         return reject(err);
//       }

//       resolve(same);
//     });
//   });
// };

const User = mongoose.model('user', userSchema);

module.exports = { User };
