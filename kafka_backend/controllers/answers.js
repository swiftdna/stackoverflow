const { body, validationResult } = require('express-validator');

const createAnswer = async (req, callback) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return callback({
		errors
	});
  }

  try {
    const { id } = req.user;
    const { text } = req.body;

    const question = await req.question.addAnswer(id, text);

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

const removeAnswer = async (req, callback) => {
  try {
    const { answer } = req.params;
    const question = await req.question.removeAnswer(answer);
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