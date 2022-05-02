const { body, validationResult } = require('express-validator');

const createComment = async (req, callback) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return callback({
		errors
	});
  }

  try {
    const { id } = req.user;
    const { comment } = req.body;

    if (req.params.answer) {
      req.answer.addComment(id, comment);
      const question = await req.question.save();
      return res.status(201).json(question);
    }

    const question = await req.question.addComment(id, comment);
    return callback(null, {
        data : question
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
	loadComments,
    createComment,
    removeComment,
	commentValidate
};
