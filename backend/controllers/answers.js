const { body, validationResult } = require('express-validator');
const Question = require('./../models/question')

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
        data : answer
    });
	} catch (error) {
        return callback(error,{
            success: false,
	    	message: error.message
        });
	}
  };

const removeAnswer = async (req, callback) => {
  try {
    const { answer } = req.params;
    const question = await req.question.removeAnswer(answer);
    return callback(null, {
		success : true,
        data : question
	});

	} catch (error) {
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
    removeAnswer,
    answerValidate
};