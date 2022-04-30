const Question = require('../models/question');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// posting the question
const createQuestion = async (req, callback ) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
	  const errors = result.array({ onlyFirstError: true });
	  return callback({
		errors
	});
	}
	try {
	  const { title, tags, text,status} = req.body;
	  const author = req.user.id;

	  const question = await Question.create({
		title,
		author,
		tags,
		text,
		status
	  });
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

// in the landing page getting all the question details
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
	  else {
		const question = await Question.find().sort(sort);
		question.map(ques=>
			{
				
				if (ques.created !== ques.modified)
				{
					console.log(ques.created);
					ques.modifies = true
				}
			});
		return callback(null, {
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
  
// getting  the details of the question overview  page
  const questiondetail = async (req, callback) => {
	try {
	  const  id  = req.params.questionid;
	  const question = await Question.findByIdAndUpdate(
		id,
		{ $inc: { views: 1 } },
		{ new: true }
	  ).populate('answers');
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

  // adding the bookmark of the question
  const addbookmark = async (req, callback) => {
	try {
	  const  {_id}  = req.body;
	  const user = req.user.id;
	  const bookmarks = await Question.updateOne(
		{_id: _id},
		{ $push: {bookmarks :{user:user}} },
	  ).populate('answers');
	  
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

  // delete the bookmark of the question
  const deletebookmark = async (req, callback) => {
	try {
	  const  {_id}  = req.body;
	  const user = req.user.id;
	  const bookmarks = await Question.updateOne(
		{_id: _id},
		{ $pull: {bookmarks :{user:user}} },
	  ).populate('answers');
	  
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

// editing the question 
  const editQuestion = async (req, callback) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
	  const errors = result.array({ onlyFirstError: true });
	  return callback({
		errors
	});
	}
	try {
	  const { title, tags, text} = req.body;
	  const author = req.user.id;
      const id = req.params.questionid
	  console.log(id);
	  const question = await Question.findByIdAndUpdate(id,{title:title,tags:tags,text:text,modified:Date.now()},{new:true});
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

  // admin approving the question
  const approvequestion = async (req, callback) => {
	
	try {
	  const id = req.params.questionid;
	  console.log(id);
	  const question = await Question.findByIdAndUpdate(id,{status:'approve'},{new:true});
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
  
  // top 10 viewed questions till date
  const mostViewedQuestions = async (req, callback) => {
	
	try {

	  const questions = await Question.find({}).sort({views : -1}).limit(10);
	  return callback(null, {
		  success : true,
		data : questions
	});
	} catch (error) {
		return callback(error,{
            success: false,
	    	message: error.message
        });
	}
  };

 // need to complete half search is done
  const searchQuestion = async (req, callback) => {
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
			return callback(null, {
				success : true,
			  data : questions
		  });
		}
		else if(req.query.exactphrase)
		{
			const words =req.query.exactphrase
			const questions = await Question.find({ title : new RegExp(words,'i') }).sort(sort);
			return callback(null, {
				success : true,
			  data : questions
		  });
		}
		else{
			return callback(null, {
			  message : "data not present"
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
	createQuestion,
	loadQuestions,
	questiondetail,
	addbookmark,
	deletebookmark,
	editQuestion,
	approvequestion,
	searchQuestion,
	mostViewedQuestions,
};