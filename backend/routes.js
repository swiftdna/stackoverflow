const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json({success: true, message: 'Welcome to API page everyone!'});
});

router.get('/questions/:questionID', (req, res) => {
  res.json({
    success: true,
    data: {
      title: "Unable to resolve dependency tree error when installing npm packages",
      created: "",
      modified: "",
      viewed: "",
      description: `
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
      
      `,
      tags: [
        "angular",
        "typescript",
        "npm",
        "angular9"
      ],
      comments: [
        {
          content: "Show your package.json - it looks like you've upgraded @angular/core, but did not upgrade @angular/http?",
          author: "Adam",
          created: "Oct 28, 2020 at 18:41"
        },
        {
          content: "my @angular/core version is 9.1.4, so shall i update @angular/http?",
          author: "Pearl",
          created: "Oct 30, 2020 at 11:03"
        },
        {
          content: "Please share your package.json file. The problem seems to be in your dependencies",
          author: "Olwen Kevin",
          created: "Nov 08, 2020 at 01:33"
        }
      ]
    }
  });
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