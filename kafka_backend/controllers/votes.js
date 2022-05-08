const user = require('../../backend/models/user');
const question = require('./../models/question');
const mongoose = require('mongoose');
const voteQuestion = async(req, callback) => {
    try {
        const {_id} = req.body;
        const user = req.user.id; 
        const {vote} = req.body;
        const votes = await question.updateOne(
        {"question._id":req.params.question},
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

const voteAnswer = async(req, callback) => {
    try {
        const {vote, user} = req.body;
        const votes = await question.update({
                "_id": mongoose.Types.ObjectId(req.params.question),
                "answers._id": mongoose.Types.ObjectId(req.params.answer)
            },
            {
                $push: {
                    "answers.$.votes": {
                        user: user,
                        vote: vote
                    }
                },
                $inc: { "answers.$.score": vote }
            });
        return callback(null, {
            data: votes
        });
    } catch(error) {
        return callback(error,{
            success: false,
	    	message: error.message
        }); 
    }
}
module.exports = {
	voteQuestion,
    voteAnswer
};