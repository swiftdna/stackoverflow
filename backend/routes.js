const express = require('express');
const passport = require('passport');
const router = express.Router();
const { createQuestion,questionValidate,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,approvequestion,searchQuestion,
  questionPostedCount } = require('./controllers/questions');
const { answerValidate } = require('./controllers/answers');
const { signup, login } = require('./controllers/users');
const {checkAuth, auth} = require("./utils/passport");
auth();

const kakfafy = (rid, req, res) => {
  const kafka = require('./kafka/client');
  const {user, params, query, body} = req;
  const modifiedRequest = { rid, user, params, query, body };
  return kafka.make_request('stackoverflow_backend_processing', modifiedRequest, (err,results) => {
    if (err){
      console.log("Inside err");
      res.json(err);
    } else {
      res.json(results);
    }
  });
};

router.get('/', (req, res) => {
	res.json({success: true, message: 'Welcome to API page everyone!'});
});

router.post('/questions', questionValidate,checkAuth, (req, res) => {
    return kakfafy('createQuestion', req, res);
  });
router.put('/questions/:questionid', questionValidate,checkAuth,(req, res) => {
    return kakfafy('editQuestion', req, res);
  });
router.get('/questions', (req, res) => {
    return kakfafy('loadQuestions', req, res);
  });
router.get('/questions/:questionid',(req, res) => {
    return kakfafy('questiondetail', req, res);
  })
router.post('/addbookmark',checkAuth,(req, res) => {
    return kakfafy('addbookmark', req, res);
  });
router.get('/searchQuestion',(req, res) => {
  return kakfafy('searchQuestion', req, res);
});
router.get('/mostViewedQuestions',(req, res) => {
  return kakfafy('mostViewedQuestions', req, res);
});
router.get('/questionPostedCount',(req, res) => {
  return kakfafy('questionPostedCount', req, res);
});
  
router.delete('/deletebookmark',checkAuth, (req, res) => {
  return kakfafy('deletebookmark', req, res);
});
router.get('/getUserStats',checkAuth, (req, res) => {
  return kakfafy('getUserStats', req, res);
});
router.put('/editUserDetails',checkAuth, (req, res) => {
  return kakfafy('editUserDetails', req, res);
});
router.post('/signup', signup);
router.post('/login', login);
router.put('/approvequestion/:questionid', (req, res) => {
  return kakfafy('approvequestion', req, res);
});

router.get('/getUserDetails',(req, res) => {
  return kakfafy('getUserDetails', req, res);
});

router.get('/userActivity',checkAuth,(req, res) => {
  return kakfafy('userActivity', req, res);
});

router.get('/answers', (req, res) => {
  return kakfafy('loadAnswers', req, res);
});

router.post('/answers', answerValidate,checkAuth, (req, res) => {
  return kakfafy('createAnswer', req, res);
});

router.delete('/deleteanswer',checkAuth, (req, res) => {
  return kakfafy('removeAnswer', req, res);
});

router.post('/comments', commentValidate,checkAuth, (req, res) => {
  return kakfafy('createComment', req, res);
});

router.get('/comments', (req, res) => {
  return kakfafy('loadComments', req, res);
});

router.delete('/deletecomment',checkAuth, (req, res) => {
  return kakfafy('removeComment', req, res);
});

module.exports = router;
