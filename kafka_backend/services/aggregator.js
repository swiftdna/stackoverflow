const { createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,approvequestion,searchQuestion,mostViewedQuestions} = require('../controllers/questions');
const {createAnswer,removeAnswer}=require('../controllers/answers');
const {createComment, removeComment}=require('../controllers/comments');
const {upvote,downvote,unvote}=require('../controllers/votes');

const routeHandler = {
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,
    createAnswer,removeAnswer,createComment,removeComment,upvote,downvote,unvote
};

function handle_request(msg, callback){
   
    console.log(">>>> Before profile kafka backend >>>>");
    const { rid } = msg;
    console.log('>>>> msg >>>>', msg);
    console.log('rid -> ', rid);

    return routeHandler[rid](msg, callback);
};

exports.handle_request = handle_request;