//path: pages/api/login.js
import dbConnect from '../../middleware/mongodb';
import User from '../../models/users';
var cryptojs = require("crypto-js");
var jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
          const bytes = cryptojs.AES.decrypt(user.password, "secreatKey");
          const decryptedpass = bytes.toString(cryptojs.enc.Utf8);

          if (req.body.email == user.email && req.body.password === decryptedpass) {
            var token = jwt.sign({ email: user.email, name: user.name }, 'jsonkey', { expiresIn: '1h' });
            res.status(200).json({ success: true, token });
          } else {
            res.status(400).json({ success: false, message: 'Invalid credentials' });
          }
        } else {
          res.status(400).json({ success: false, message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Invalid method' });
      break;
  }
}
