const { createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,questionPostedCount,approvequestion,searchQuestion,mostViewedQuestions} = require('../controllers/questions');
const {createAnswer,removeAnswer,getAllAnswersForQuestions}=require('../controllers/answers');
const {createComment, removeComment, createquestioncomment}=require('../controllers/comments');
const {upvoteQuestion,upvoteAnswer,downvote,unvote}=require('../controllers/votes');
const { getUserDetails,getUserStats,editUserDetails,userActivity}= require('../controllers/users');

const routeHandler = {
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,
    createAnswer,removeAnswer,createComment,removeComment,createquestioncomment,upvoteQuestion,upvoteAnswer,downvote,unvote,
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,questionPostedCount,
    getUserDetails,getUserStats,editUserDetails,userActivity,
    removeAnswer,createComment,removeComment,downvote,unvote,getAllAnswersForQuestions
};

function handle_request(msg, callback){
   
    console.log(">>>> Before profile kafka backend >>>>");
    const { rid } = msg;
    console.log('>>>> msg >>>>', msg);
    console.log('rid -> ', rid);

    return routeHandler[rid](msg, callback);
};

exports.handle_request = handle_request;