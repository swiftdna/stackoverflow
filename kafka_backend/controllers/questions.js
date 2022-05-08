const Question = require('../models/question');
const Bookmark = require('./../models/bookmark')
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const moment = require('moment');
const mongoose = require('mongoose');

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
	  await tags.forEach( async (tag) =>
        {   
	 //const usertags = await User.findOne({ '_id' : mongoose.Types.ObjectId(req.user.id),"tags_post_count.tag":{$exists:true}}]});
	 await User.updateOne(
		{ '_id': mongoose.Types.ObjectId(req.user.id) },
		{ $inc: { [`tags_post_count.${tag}`]: 1 } }
	 )
		})
      return callback(null, {
		success: true,
        data : question
    });
	} catch (error) {
        return callback(error,{
            success: false,
	    	message: error.message
        });
	}
  };

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
		let question = await Question.find().sort(sort);
		question = await question.map(ques=> {
			let temp = {};
			if (ques.created !== ques.modified) {
				console.log('changing this ->>>', JSON.stringify(temp));
				temp.hello = true;
				console.log('changed this ->>>',JSON.stringify(temp));
			}
			return ques;
		});
		console.log('question ---> ',JSON.stringify(question) );
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
  
  
  const questiondetail = async (req, callback) => {
		try {
		  const  id  = req.params.questionid;
		  const question = await Question.findByIdAndUpdate(
				id,
				{ $inc: { views: 1 } },
				{ new: true, lean:true }
		  ).populate('answers');

		  let totalVotes = 0;
		  question.votes.map(vt => {
			totalVotes = totalVotes + vt.vote;
		  });

		  question.total_votes = totalVotes;
		  if (question.text) {
			const tmp = JSON.parse(question.text);
			question.text = tmp.blocks;
		  }
		  question.createdText = moment(question.created).fromNow();
		  question.modifiedText = moment(question.modified).fromNow();

		  return callback(null, {
		  	success: true,
				data : question
			});
		} catch (error) {
			return callback(error,{
	      success: false,
		    message: error.message
	    });
		}
  };

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


  const getBookmarks = async (req,callback) => {
	  try {
		  const bookmarks = await Bookmark.findAll()
		  console.log(bookmarks)
	  } catch (error) {
			return callback(error,{
				success:false,
				message:error.message
			})
	  }
  }

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

  const questionPostedCount = async (req, callback) => {
	
	try {
      const todaydate= Date.now();
	  console.log('date',todaydate);
	  const date= todaydate.split('T');
	  const questions = await Question.find({}).sort({created:-1});
	  const count=0;
	  await questions.map(ques=>
		{
           {
			   if (ques.created.split('T')[0] === date[0])
			   {
				   count=count+1
			   }
		   }
		})
		console.log(count)
	  return callback(null, {
		  success : true,
		data : count
	});
	} catch (error) {
		return callback(error,{
            success: false,
	    	message: error.message
        });
	}
  };
  
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
	mostViewedQuestions,questionPostedCount
};