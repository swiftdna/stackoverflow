const express = require('express');
const passport = require('passport');
const router = express.Router();
const { createQuestion,questionValidate,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,approvequestion,searchQuestion,
  questionPostedCount} = require('./controllers/questions');
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
 
router.put('/approvequestion/:questionid', (req, res) => {
    return kakfafy('approvequestion', req, res);
  });
module.exports = router;
