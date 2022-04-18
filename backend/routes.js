const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json({success: true, message: 'Welcome to API page!'});
});

router.get('/session', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.session) {
    const {passport: {user}} = req.session ? req.session : {};
    console.log('req.session ->> ', req.session);
    res.json({ success: true, isAuthenticated: true, user: {email: user.email, id: user._id, username: user.username} });
  } else {
    res.status(401).json({message: "Not authorized", success: false});
  }
});

module.exports = router;