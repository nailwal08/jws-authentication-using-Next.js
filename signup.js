//path: pages/api/signup.js
import dbConnect from '../../middleware/mongodb';
import User from '../../models/users';
var cryptojs = require("crypto-js");

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { name, email } = req.body;
        const user = await User.create({ name, email, password: cryptojs.AES.encrypt(req.body.password, "secreatKey").toString() });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
