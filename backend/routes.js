const express = require('express');
const passport = require('passport');
const router = express.Router();
const { createQuestion,questionValidate,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,approvequestion,searchQuestion,questionPostedCount} = require('./controllers/questions');
const { signup,login} = require('./controllers/users');
const {getALLtags} = require('./controllers/tags');
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

router.post('/questions', questionValidate,checkAuth, (req, res) => {
    return kakfafy('createQuestion', req, res);
  });
router.put('/questions/:questionid', questionValidate,checkAuth,(req, res) => {
    return kakfafy('editQuestion', req, res);
  });
router.get('/loadQuestions', (req, res) => {
    return kakfafy('loadQuestions', req, res);
  });
router.get('/getquestion/:questionid',(req, res) => {
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
  router.get('/topUserTags',checkAuth, (req, res) => {
    return kakfafy('topUserTags', req, res);
  });

router.get('/getALLtags', getALLtags);

router.post('/signup', signup);
router.post('/login', login);
router.put('/approvequestion/:questionid', (req, res) => {
    return kakfafy('approvequestion', req, res);
  });
  router.get('/topUserPosts',checkAuth,(req, res) => {
    return kakfafy('topUserPosts', req, res);
  })
 
  router.get('/getUserDetails',(req, res) => {
    return kakfafy('getUserDetails', req, res);
  })
  router.get('/getTopUserReputation',(req, res) => {
    return kakfafy('getTopUserReputation', req, res);
  })
  router.get('/getLeastUserReputation',(req, res) => {
    return kakfafy('getLeastUserReputation', req, res);
  })
  router.get('/userActivity',checkAuth,(req, res) => {
    return kakfafy('userActivity', req, res);
  })
  router.get('/userTagQuestions',checkAuth,(req, res) => {
    return kakfafy('userTagQuestions', req, res);
  })
  
module.exports = router;
