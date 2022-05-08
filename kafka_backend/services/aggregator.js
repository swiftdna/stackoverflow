
const { createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,questionPostedCount,approvequestion,searchQuestion,mostViewedQuestions} = require('../controllers/questions');
const { getUserDetails,getUserStats,editUserDetails,userActivity,topUserTags,topUserPosts,getLeastUserReputation,
    getTopUserReputation,userTagQuestions}= require('../controllers/users');
const routeHandler = {
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,questionPostedCount,
    getUserDetails,getUserStats,editUserDetails,userActivity,topUserTags,topUserPosts,getLeastUserReputation,
    getTopUserReputation,userTagQuestions
};

function handle_request(msg, callback){
   
    console.log(">>>> Before profile kafka backend >>>>");
    const { rid } = msg;
    console.log('>>>> msg >>>>', msg);
    console.log('rid -> ', rid);

    return routeHandler[rid](msg, callback);
};

exports.handle_request = handle_request;