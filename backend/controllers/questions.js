const Question = require('../models/question');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');


  const searchQuestion = async (req, res) => {
	try {
		const sortType = req.query.tab
		if (sortType)
        {
            var sort={};
            
            sort[sortType] = -1
        }
		if(req.query.tag)
		{
			const tags =req.query.tag
			const data = tags.split(" ");
			const questions = await Question.find({ tags: { $all: data[0] }}).sort(sort);
			res.status(200).json({success:true,questions});
		}
		else if(req.query.exactphrase)
		{
			const words =req.query.exactphrase
			const questions = await Question.find({ title : new RegExp(words,'i') }).sort(sort);
			res.status(200).json({success:true,questions});
		}
		else{
			res.status(200).json("tag not present");
		}
	  
	} catch (error) {
		res.status(500).json({
	    	success: false,
	    	message: error.message
	    });
	}
  };
  
  const questionValidate = [
	body('title')
	  .exists()
	  .trim()
	  .withMessage('is required')
  
	  .notEmpty()
	  .withMessage('cannot be blank')
  
	  .isLength({ max: 180 })
	  .withMessage('must be at most 180 characters long'),
  
	body('text')
	  .exists()
	  .trim()
	  .withMessage('is required')
  
	  .isLength({ min: 10 })
	  .withMessage('must be at least 10 characters long')
  
	  .isLength({ max: 5000 })
	  .withMessage('must be at most 5000 characters long'),
  
	body('tags').exists().withMessage('is required')
  ];

 	const loadQuestions = async (req, callback) => {
	try {
		
		const sortType = req.query.tab
		if (sortType)
        {
            var sort={};
            
            sort[sortType] = -1
        }
	  if (sortType === 'Unanswered')
	  {
		const question = await Question.find({ "answers": { $size: 0 } }).sort({"score" : -1});
        return callback(null, {
			data : question
		});
	  }
	  else
	  {
		let question = await Question.find().sort(sort);
		console.log('got data - ', question.length);
		return callback(null, {
			success: true,
			data : question
		});
	  }
	  
	} catch (error) {
		return callback(error,{
            success: false,
	    	message: error.message
        });
	}
  };

module.exports = {
	questionValidate,
	searchQuestion,
	loadQuestions
};