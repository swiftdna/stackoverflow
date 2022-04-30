const { createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,editQuestion,approvequestion,searchQuestion,mostViewedQuestions} = require('../controllers/questions');

const routeHandler = {
    createQuestion,loadQuestions,questiondetail,addbookmark,deletebookmark,
    editQuestion,approvequestion,searchQuestion,mostViewedQuestions,
   
};

function handle_request(msg, callback){
   
    console.log(">>>> Before profile kafka backend >>>>");
    const { rid } = msg;
    console.log('>>>> msg >>>>', msg);
    console.log('rid -> ', rid);

    return routeHandler[rid](msg, callback);
};

exports.handle_request = handle_request;