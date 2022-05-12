
const { createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,questionPostedCount,approvequestion,searchQuestion,mostViewedQuestions,rejectQuestion,getPendingQuestion} = require('../controllers/questions');
const {createAnswer,getAllAnswersForQuestions,getbestAnswer, removeAnswer}=require('../controllers/answers');
const {createComment,createquestioncomment, removeComment, getAllComments, getAllAnswerComments}=require('../controllers/comments');
const {voteQuestion,voteAnswer}=require('../controllers/votes');
const { getUserDetails,getUserStats,editUserDetails,userActivity,topUserTags,topUserPosts,getLeastUserReputation,
    getTopUserReputation,userTagQuestions}= require('../controllers/users');
const {upvote,downvote,unvote}=require('../controllers/votes');
const {getBadgesById} = require('../controllers/badgeController')
const {addTag, getALLtags, getPopularTags, getSearchTags} = require('../controllers/tagController')

const routeHandler = {
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,
    createAnswer,createComment,createquestioncomment,voteQuestion,voteAnswer, questionPostedCount,
    getUserDetails,getUserStats,editUserDetails,userActivity,
    removeAnswer,removeComment,upvote,downvote,unvote,
    getBadgesById,topUserTags,topUserPosts,getLeastUserReputation,
    getTopUserReputation,userTagQuestions,getAllComments,
    getAllAnswersForQuestions,getAllAnswerComments,
    addTag, getALLtags, getPopularTags, getSearchTags,getbestAnswer,rejectQuestion,getPendingQuestion,
};

function handle_request(msg, callback){
   
    console.log(">>>> Before profile kafka backend >>>>");
    const { rid } = msg;
    console.log('>>>> msg >>>>', msg);
    console.log('rid -> ', rid);

    return routeHandler[rid](msg, callback);
};

exports.handle_request = handle_request;