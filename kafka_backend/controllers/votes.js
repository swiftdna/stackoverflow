const user = require('../../backend/models/user');
const question = require('./../models/question');
const mongoose = require('mongoose');
const User = require('./../models/User');
const userTagSchema = require('../../backend/models/usertags');

const voteQuestion = async(req, callback) => {
    try {
        const {_id} = req.body;
        const user = req.user.id; 
        const {vote} = req.body;
        const votes = await question.updateOne(
            {
                "_id": req.params.question
            },
            {
                $push:{
                    votes:{
                        user:user,
                        vote:vote
                    }
                },
                $inc: { "score": vote }
            }
        );
        const user1 = await question.find({"_id":mongoose.Types.ObjectId(req.params.question)})
        if(vote>0){
            await User.update({"_id":user1.author},
            {"$set":{$inc: { Reputation : 10}}}
            )
        } else {
            await User.update({"_id":user1},
            {"$set":{$inc: { Reputation : -10}}}
            )
        }
        return callback(null,{
            success: true,
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
        const user = req.user.id; 
        const {vote} = req.body;
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
                $inc: { "answers.$.score": vote },
            });
            const answer = await question.aggregate([ {
                $match :
                             { "answers._id" : mongoose.Types.ObjectId(req.params.answer) }
                    },
             {
                $project : {
                    answers : {
                       $filter: {
                          input : "$answers",
                          as : "answer",
                          cond : 
                                { "$eq" : [ "$$answer._id", mongoose.Types.ObjectId(req.params.answer) ] },
                       }
                    }
                }
             }
             ])

            if(vote>0){
                await User.update({"_id":answer.author},
                {"$set":{$inc: { Reputation : 5}}}
            );
            } else {
            await User.update({"_id":user1},
            {"$set":{$inc: { Reputation : -5}}})
            }
            return callback(null, {
            success: true,
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