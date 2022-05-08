const { body, validationResult } = require('express-validator');
const question = require('./../models/question')

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
        
        {_id : req.params.question,"answers._id" : req.params.answer},
        {$push:{"answers.$.comments":{author:req.user.id,
            body:body}}}
    );
    return callback(null,{
        data:comment
    });
 } catch (error) {
        return callback(error,{
            success: false,
	    	message: error.message
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
            
            {_id : req.params.question},
            {$push:{"comments":{author:req.user.id,
                body:body}}}
        );
        return callback(null,{
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
	commentValidate
};
