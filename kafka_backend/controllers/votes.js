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
        const user1 = await question.findById({_id:mongoose.Types.ObjectId(req.params.question)})
        console.log("author detailsssss ",user1.tags);
        if(vote>0){
            await User.updateOne({"_id":  user1.author._id},
            { $inc: { "Reputation": 10 } }
            
            )
            await user1.tags.map( async (tag) => {   
                console.log("tags-->",tag)
                await User.updateOne(
                    { '_id': mongoose.Types.ObjectId(user1.author._id) },
                    { $inc: { [`tags_score.${tag}`]: 1 } }
                )
            });
        } else {
            await User.updateOne({"_id": user1.author._id},
            { $inc: { "Reputation": -10 } }
            )
            
            await user1.tags.forEach( async (tag) => {   
              
                //const usertags = await User.findOne({ '_id' : mongoose.Types.ObjectId(req.user.id),"tags_post_count.tag":{$exists:true}}]});
                await User.updateOne(
                    { '_id': mongoose.Types.ObjectId(user1.author._id) },
                    { $inc: { [`tags_score.${tag}`]: -1 } }
                )
            });
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
console.log("answers is---->",answer && answer[0]);
            if(vote>0){
                await User.updateOne({"_id":  answer && answer[0].answers[0].author},
            { $inc: { "Reputation": 5 } }
                )
            } else {
                console.log("author --->",answer && answer[0].answers[0].author)
            await User.updateOne({"_id": answer && answer[0].answers[0].author},
            { $inc: { "Reputation": -5 } })
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
