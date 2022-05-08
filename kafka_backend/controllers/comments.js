const { body, validationResult } = require('express-validator');
// const question = require('../../backend/models/question');
const question = require('./../models/question')
const mongoose = require('mongoose');

const createComment = async (req, callback) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return callback({
		errors
	});
  }
  try {
    const { body } = req.body;
    const comment = await question.update(
        
        {_id : mongoose.Types.ObjectId(req.params.question),"answers._id" : mongoose.Types.ObjectId(req.params.answer)},
        {$push:{"answers.$.comments":{author:req.user.id,
            body:body}}}
    );
    return callback(null,{
        success: true,
        data:comment
    });
 } catch (error) {
        return callback(error,{
            success: false,
	    	message: error.message
        });
	}
};
const getAllComments = async(req,callback)=>{
    try {
        const data = await question.findOne({_id: mongoose.Types.ObjectId(req.params.question)}, {comments: 1}, {lean: true});
        return callback(null, {
            data: data.comments
        });
    } catch (error){
        return callback(error,{
            success:false,
            message:error.message
        });
    }
};

const getAllAnswerComments = async(req,callback)=>{
    try {
        const data = await question.findOne({
        "answers._id": mongoose.Types.ObjectId(req.params.answer)},
        {"answers.comments":1}
        );
        console.log(data,"****************************");
        return callback(null,{
            data : data.answers.comments
        });
    } catch (error){
        return callback(error,{
            success:false,
            message:error.message
        });
    }
};

const createquestioncomment = async(req,callback) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        return callback({
            errors
        });
      }
      try {
        const { body } = req.body;
        const comment = await question.updateOne(
            {"_id" : mongoose.Types.ObjectId(req.params.question)},
            {$push:{comments:{author:req.user.id,
                body:body}}}
        );
        console.log("Comment called");
        return callback(null,{
            success: true,
            data:comment
        });
     } catch (error) {
            return callback(error,{
                success: false,
                message: error.message
            });
        }
    };

const removeComment = async (req, callback) => {
  const { comment } = req.params;

  try {
    if (req.params.answer) {
      req.answer.removeComment(comment);
      const question = await req.question.save();
      return callback(null, {
		success : true,
	});
    }

    const question = await req.question.removeComment(comment);
    return callback(null, {
		success : true,
	});
  } catch (error) {
    return callback(error,{
        success: false,
        message: error.message
    });
}
};

const commentValidate = [
  body('comment')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ max: 1000 })
    .withMessage('must be at most 1000 characters long')
];
module.exports = {
    createComment,
    removeComment,
    createquestioncomment,
    getAllComments,
    getAllAnswerComments,
	commentValidate
};
