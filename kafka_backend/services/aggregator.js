
const { createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,questionPostedCount,approvequestion,searchQuestion,mostViewedQuestions} = require('../controllers/questions');
const { getUserDetails,getUserStats,editUserDetails,userActivity,topUserTags,topUserPosts,getLeastUserReputation,
    getTopUserReputation,userTagQuestions}= require('../controllers/users');
const {createAnswer,removeAnswer}=require('../controllers/answers');
const {createComment, removeComment, createquestioncomment}=require('../controllers/comments');
const {upvote,downvote,unvote}=require('../controllers/votes');
const {getBadgesById} = require('../controllers/badgeController')
const {addTag, getALLtags, getPopularTags, getSearchTags} = require('../controllers/tagController')

const routeHandler = {
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,
    createAnswer,removeAnswer,createComment,removeComment,createquestioncomment,upvote,downvote,unvote,
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,questionPostedCount,
    getUserDetails,getUserStats,editUserDetails,userActivity,
    removeAnswer,createComment,removeComment,upvote,downvote,unvote,
    getBadgesById,topUserTags,topUserPosts,getLeastUserReputation,
    getTopUserReputation,userTagQuestions,
    addTag, getALLtags, getPopularTags, getSearchTags
};

function handle_request(msg, callback){
   
    console.log(">>>> Before profile kafka backend >>>>");
    const { rid } = msg;
    console.log('>>>> msg >>>>', msg);
    console.log('rid -> ', rid);

    return routeHandler[rid](msg, callback);
};

exports.handle_request = handle_request;