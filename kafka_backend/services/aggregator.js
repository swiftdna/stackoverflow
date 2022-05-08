const { createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,questionPostedCount,approvequestion,searchQuestion,mostViewedQuestions} = require('../controllers/questions');
const {createAnswer,getAllAnswersForQuestions}=require('../controllers/answers');
const {createComment,createquestioncomment, getAllComments, getAllAnswerComments}=require('../controllers/comments');
const {voteQuestion,voteAnswer}=require('../controllers/votes');
const { getUserDetails,getUserStats,editUserDetails,userActivity}= require('../controllers/users');

const routeHandler = {
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,
    createAnswer,createComment,createquestioncomment,voteQuestion,voteAnswer,
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,questionPostedCount,
    getUserDetails,getUserStats,editUserDetails,userActivity,getAllComments,
    createComment,getAllAnswersForQuestions,getAllAnswerComments
};

function handle_request(msg, callback){
   
    console.log(">>>> Before profile kafka backend >>>>");
    const { rid } = msg;
    console.log('>>>> msg >>>>', msg);
    console.log('rid -> ', rid);

    return routeHandler[rid](msg, callback);
};

exports.handle_request = handle_request;