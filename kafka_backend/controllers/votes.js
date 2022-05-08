const user = require('../../backend/models/user');
const question = require('./../models/question')
// const upvote1 = async (req, callback) => {
//     const { id } = req.user;
  
//     if (req.answer) {
//       req.answer.vote(id, 1);
//       const question = await req.question.save();
//       return callback(null, {
//         data : question
//     });
//     }
//     const question = await req.question.vote(id, 1);
//     return callback(null, {
//         data : question
//     });
// };
const upvoteQuestion = async(req, callback) => {
    // const {id} = req.user.id;
    try {
        const {_id} = req.body;
        const user = req.user.id; 
        const {vote} = req.body;
        const votes = await question.updateOne(
        {"question._id":req.params.question},
        // {_id : _id},
        {$push:{votes:{user:user,vote:vote
        }}});
        return callback(null,{
            data : votes
        });
    } catch(error) {
        return callback(error,{
            success: false,
	    	message: error.message
        });
    }
} 

const upvoteAnswer = async(req, callback) => {
    try {
        const user = req.user.id;
        const {vote} = req.body;
        const votes = await question.update(
            {_id:req.params.question},
            {"answers._id":req.params.answer},
            {$push:{"answers.$.votes":{user:user,vote:vote
            }}});
            return callback(null, {
                data : votes
            });
    } catch(error) {
        return callback(error,{
            success: false,
	    	message: error.message
        }); 
    }
}
const downvote = async (req, callback) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, -1);
      const question = await req.question.save();
      return callback(null, {
        data : question
    });
    }
    const question = await req.question.vote(id, -1);
    return callback(null, {
        data : question
    });
}
  
const unvote = async (req, callback) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, 0);
      const question = await req.question.save();
      return callback(null, {
        data : question
    });
    }
    const question = await req.question.vote(id, 0);
    return callback(null, {
        data : question
    });
};
module.exports = {
	upvoteQuestion,
    upvoteAnswer,
	downvote,
    unvote
};