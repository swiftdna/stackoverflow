const express = require('express');
const passport = require('passport');
const router = express.Router();
const { createQuestion,questionValidate,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,approvequestion,searchQuestion,
  questionPostedCount } = require('./controllers/questions');
const { answerValidate } = require('./controllers/answers');
const {commentValidate } = require('./controllers/comments');
const { signup, login } = require('./controllers/users');
const {checkAuth, auth} = require("./utils/passport");
const {
  addTag,
  getALLtags,
  getPopularTags,
  getSearchTags,
} = require('./controllers/tagController')

const { getBadgesById } = require('./controllers/badgeController')
auth();

const kakfafy = async (rid, req, res) => {
  const kafka = require('./kafka/client');
  const {user, params, query, body} = req;
  const modifiedRequest = { rid, user, params, query, body };
  // // caching layer with redis
  // const client = COREAPP.rclient;
  // const cachedResponse = await client.get(rid);
  // if (query && query.cache && cachedResponse) {
  //   res.json(JSON.parse(cachedResponse));
  //   console.log(`Served ${rid} from cache`);
  //   return;
  // }
  return kafka.make_request('stackoverflow_backend_processing', modifiedRequest, async (err,results) => {
    if (err){
      console.log("Inside err");
      res.json(err);
    } else {
      // Add data to cache
      // await client.set(rid, JSON.stringify(results));
      // console.log(`Saved ${rid} data to cache`);
      res.json(results);
    }
  });
};



// Tags Routes
// router.post('/tags/addTag', addTag)
// router.get('/tags/getAllTags', getALLtags)
// router.get('/tags/getPopularTags', getPopularTags)
// router.get('/tags/searchTags/:searchQuery', getSearchTags)

// Badges Routes
//router.get('/badges/getAllbadges/:userID', getBadgesById)

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
  router.get('/topUserTags',checkAuth, (req, res) => {
    return kakfafy('topUserTags', req, res);
  });



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


router.get('/',(req, res) => {
  return kakfafy('getUserDetails', req, res);
});

router.get('/userActivity',checkAuth,(req, res) => {
  return kakfafy('userActivity', req, res);
});

router.post('/answers/:question',checkAuth, (req, res) => {
  return kakfafy('createAnswer', req, res);
});

//Getting answers for all questions.

router.get('/getAnswers/:question',checkAuth,(req,res)=>{
  return kakfafy('getAllAnswersForQuestions',req,res);
});

//API for getting ALL comments for questions.

router.get('/getComments/:question',checkAuth,(req,res)=>{
  return kakfafy('getAllComments',req,res);
});

//API for getting ALL comments for answers.

router.get('/getAnswerComments/:answer',checkAuth,(req,res) => {
  return kakfafy('getAllAnswerComments',req,res);

});

//Creating comment for the answer.

router.post('/comments/:question/:answer',checkAuth, (req, res) => {
  return kakfafy('createComment', req, res);
});

//Creating comments for question.

router.post('/comments/:question',checkAuth,(req,res) => {
  return kakfafy('createquestioncomment',req,res);
})

// Upvoting and Downvoting the Question.
router.post('/votes/vote/:question',checkAuth,(req,res)=>{
  return kakfafy('voteQuestion',req,res);
});

//Upvoting and Downvoting the answer.
router.post('/votes/vote/:question/:answer',checkAuth,(req,res)=>{
  return kakfafy('voteAnswer',req,res);
});

router.get('/v1/questions', (req, res) => {
  return loadQuestions(req, (err, results) => {
    return res.json(results);
  })
  // return kakfafy('loadQuestions', req, res);
});

router.post('/downvote',(req,res)=>{
  return kakfafy('downvote',req,res);
});

// badge routes
router.get('/badges/getAllbadges/:userID', (req, res) => {
  return kakfafy('getBadgesById', req, res);
});

// tag routes
router.post('/tags/addTag',(req,res)=>{
  return kakfafy('addTag',req,res);
});

router.get('/tags/getAllTags', (req, res) => {
  return kakfafy('getALLtags', req, res);
});

router.get('/tags/getPopularTags', (req, res) => {
  return kakfafy('getPopularTags', req, res);
});

router.get('/tags/searchTags/:searchQuery', (req, res) => {
  return kakfafy('getSearchTags', req, res);
});

module.exports = router;
