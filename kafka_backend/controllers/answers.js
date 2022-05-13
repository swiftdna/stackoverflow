const { body, validationResult } = require('express-validator');
const Question = require('./../models/question')
const mongoose = require('mongoose');
const question = require('./../models/question');
const User = require('./../models/User');

const createAnswer = async (req, callback) => {
    
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return callback({
		errors
	});
  }
  try {
    const { text } = req.body;
    const answer = await Question.updateOne(
        {_id : req.params.question},
        {$push:{answers:{author:req.user.id,
        text:text}}});
    return callback(null, {
        success: true,
        data : answer
    });
	} catch (error) {
        return callback(error,{
            success: false,
	    	message: error.message
        });
	}
  };
const getAllAnswersForQuestions = async(req,callback) => {
    try {
        const data = await Question.findOne({_id: mongoose.Types.ObjectId(req.params.question)}, {answers: 1}, {lean: true});
        return callback(null, {
            data: data.answers
        });
    } catch (error){
        return callback(error,{
            success:false,
            message:error.message
        });
    }
};
const getbestAnswer = async(req,callback)=>{
    try {
        const question = await Question.find({"_id":mongoose.Types.ObjectId(req.params.question)},{},{lean:true})

        await Promise.all(question.map( 
            dt => {
        dt.answers.map(
            async answ =>{
            if (answ.isbestanswer === true)
            {
               await Question.updateOne(
                    { "_id":mongoose.Types.ObjectId(req.params.question), "answers._id": answ._id}, 
                    { "$set": { "answers.$.isbestanswer": false, isbestanswercreated:Date.now()} }
                )  
                await User.updateOne({"_id":answ.author},
                { $inc: { "Reputation": -15 } });
            }
            if (req.params.answer ===  answ._id.toString())
            {
                const answer = await Question.updateOne(
                    { "_id":mongoose.Types.ObjectId(req.params.question), "answers._id": mongoose.Types.ObjectId(req.params.answer)}, 
                    { "$set": { "answers.$.isbestanswer": true, isbestanswercreated:Date.now()} }
                )
                await Question.findByIdAndUpdate(
                    { _id:mongoose.Types.ObjectId(req.params.question)}, 
                    {bestanswer: true},{upsert:true,lean:true}
                ) 
                await User.updateOne({"_id":answ.author},
                { $inc: { "Reputation": 15 } });
            }
     }) } ))
        return callback(null, {
            success: true
        });
    } catch {
        return callback(error,{
            success: false,
	    	message: error.message
        });
    }
};



const answerValidate = [
  body('text')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ min: 30 })
    .withMessage('must be at least 30 characters long')

    .isLength({ max: 30000 })
    .withMessage('must be at most 30000 characters long')
];
module.exports = {
    createAnswer,
    answerValidate,
    getAllAnswersForQuestions,
    getbestAnswer
};