const Question = require('../models/question');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('./helper');

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
		  if (question.text && helper.isJsonString(question.text)) {
			const tmp = JSON.parse(question.text);
			question.text = tmp.blocks;
			question.isMultiMedia = true;
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
		if(req.query.key === 'tag')
		{
			const tags =req.query.value;
			const data = tags.split(" ");
			const tagdata= data[0];
			data.shift();
			const searchstring = data.join('');
			console.log(tagdata,searchstring);
			let questions = await Question.find({ tags: { $all: tagdata }, $or: [ { "title": new RegExp(searchstring,'i')}, { "text": new RegExp(searchstring,'i') }]}).lean()
			
			console.log("initial questions are",(questions))
    
			for (let i = 0; i < questions.length; i++) {
				questions[i].type="question";
				questions[i].temp=questions[i].created;
			}
			console.log("questions are",questions)
			let answ = await Question.find({ tags: { $all: tagdata },"answers.text": new RegExp(searchstring,'i')}).lean();
			console.log("initial answ",answ);
			const regex = new RegExp(searchstring,'i')
			for (let j = 0;   j< answ.length; j++) {
				let count =0;
				for (let k = 0; k < answ[j].answers.length; k++)
				{
					if (regex.test(answ[j].answers[k].text ))
					{
						if (count <1){
							answ[j].temp=answ[j].answers[k].created;
							answ[j].ansauthor=answ[j].answers[k].author;
							count=count+1
							}
							else
							{
								if (answ[j].temp < answ[j].answers[k].created)
								{
									answ[j].temp=answ[j].answers[k].created;
									answ[j].ansauthor=answ[j].answers[k].author;
								}
							}
					}
				}
				answ[j].type='answer';
			}
			console.log("answers are",answ)
			let consolidated = questions.concat(answ);
			// sorting based on score or newest
			if (sortType === "temp")
			{
            consolidated.sort( (a, b) => {
				let da = new Date(a.temp),
			db = new Date(b.temp);
		return db - da;
			});
		}
		if (sortType === "score")
			{
            consolidated.sort( (a, b) => b.score - a.score);
		}
			//console.log("consolidated data are",consolidated)
			
			return callback(null, {
				success : true,
			  data : consolidated,
			  resultcount :consolidated.length
		  });
		}
		// exact phrase search
		else if(req.query.key === 'exactphrase')
		{
			const questions = await Question.find({$or: [ { "title": new RegExp(req.query.value,'i')}, { "text": new RegExp(req.query.value,'i') }]}).lean();
			//{"answers.text": new RegExp(req.query.value,'i')}]}).sort(sort)
			for (let i = 0; i < questions.length; i++) {
                //Object.assign(questions[i], {type:'question',temp:'temp'})
				console.log('----->count ', i);
				questions[i].type="question";
				questions[i].temp=questions[i].created;			
			}
			//console.log("questions are",questions)
			const regex = new RegExp(req.query.value,'i')
			const answ = await Question.find({"answers.text": new RegExp(req.query.value,'i')}).lean()
			for (let j = 0;   j< answ.length; j++) {
				let count=0
				for (let k = 0; k < answ[j].answers.length; k++)
				{
					if (regex.test(answ[j].answers[k].text ))
					{
						if (count <1){
							answ[j].temp=answ[j].answers[k].created;
							answ[j].ansauthor=answ[j].answers[k].author;
							count=count+1
							}
							else
							{
								if (answ[j].temp < answ[j].answers[k].created)
								{
									answ[j].temp=answ[j].answers[k].created;
									answ[j].ansauthor=answ[j].answers[k].author;
								}
							}
					}
				}
				answ[j].type='answer';
			}
			console.log("answers are",answ)
			let consolidated = questions.concat(answ);
			// sorting based on score or newest
			if (sortType === "temp")
			{
            consolidated.sort( (a, b) => {
				let da = new Date(a.temp),
			db = new Date(b.temp);
		return db - da;
			});
		}
		if (sortType === "score")
			{
            consolidated.sort( (a, b) => b.score - a.score);
		}
			//console.log("consolidated data are",consolidated)
			
			return callback(null, {
				success : true,
			  data : consolidated,
			  resultcount :consolidated.length
		  });
		}
		else if(req.query.key === 'user')
		{
			const users = req.query.value
			const data = users.split(" ");
			const userdata= data[0];
			data.shift();
			const searchstring = data.join('');
			const questions = await Question.find({$and:[{$or:[{author : userdata}]},{$or: [ { "title": new RegExp(searchstring,'i')}, { "text": new RegExp(searchstring,'i') }]}]}).lean();
			for (let i = 0; i < questions.length; i++) {
                //Object.assign(questions[i], {type:'question',temp:'temp'})
				//console.log('----->count ', i);
				questions[i].type="question";
				questions[i].temp=questions[i].created;			
			}
			const regex = new RegExp(searchstring,'i');
			const answ = await Question.find({$and:[{$or:[{"answers.author" : userdata}]},{$or: [ { "answers.text": new RegExp(searchstring,'i')}]}]}).lean();
			console.log('-------> answer are',answ);
			for (let j = 0;   j< answ.length; j++) {
				let count =0
				for (let k = 0; k < answ[j].answers.length; k++)
				{
					if (answ[j].answers[k].author === userdata && regex.test(answ[j].answers[k].text ))
					{
						if (count <1){
							answ[j].temp=answ[j].answers[k].created;
							answ[j].ansauthor=answ[j].answers[k].author;
							count=count+1
							}
							else
							{
								if (answ[j].temp < answ[j].answers[k].created)
								{
									answ[j].temp=answ[j].answers[k].created;
									answ[j].ansauthor=answ[j].answers[k].author;
								}
							}
					}
				}
				
				answ[j].type='answer';
			}
			let consolidated = questions.concat(answ);
			// sorting based on score or newest
			if (sortType === "temp")
			{
            consolidated.sort( (a, b) => {
				let da = new Date(a.temp),
			db = new Date(b.temp);
		return db - da;
			});
		}
		if (sortType === "score")
			{
            consolidated.sort( (a, b) => b.score - a.score);
		}
			//console.log("consolidated data are",consolidated)
			
			return callback(null, {
				success : true,
			  data : consolidated,
			  resultcount :consolidated.length
		  });
		}
		else if(req.query.key === 'question')
		{
			const quessearch = req.query.value
			const questions = await Question.find({$or: [ { "title": new RegExp(quessearch,'i')}, { "text": new RegExp(quessearch,'i') }]}).lean();
			if (sortType === "temp")
			{
            questions.sort( (a, b) => {
				let da = new Date(a.created);
			db = new Date(b.created);
		return db - da;
			});
		}
		if (sortType === "score")
			{
            questions.sort( (a, b) => b.score - a.score);
		}
			// $or: [ { "title": new RegExp(searchstring,'i')}, { "text": new RegExp(searchstring,'i') },{"answers.text": new RegExp(searchstring,'i')}]}).sort(sort)
			//{"answers.author":userdata}
			return callback(null, {
				success : true,
			  data : questions,
			  resultscount: questions.length
		  });
		}
		else if(req.query.key === 'answer')
		{
			const anssearch = req.query.value
			const answ = await Question.find({'answers.isbestanswer': true, "answers.text": new RegExp(anssearch,'i')}).lean();
			const regex = new RegExp(anssearch,'i');
			//let count=0
			for (let j = 0;j< answ.length; j++) {
				let count=0
				for (let k = 0; k < answ[j].answers.length; k++)
				{	
					if (answ[j].answers[k].isbestanswer === true && regex.test(answ[j].answers[k].text ))
					{
						if (count <1){
						answ[j].temp=answ[j].answers[k].created;
						answ[j].ansauthor=answ[j].answers[k].author;
						count=count+1
						}
						else
						{
							if (answ[j].temp < answ[j].answers[k].created)
							{
								answ[j].temp=answ[j].answers[k].created;
								answ[j].ansauthor=answ[j].answers[k].author;
							}
						}
					}
				}
				answ[j].type='answer';
			}
			if (sortType === "temp")
			{
            answ.sort( (a, b) => {
				let da = new Date(a.temp);
			db = new Date(b.temp);
		return db - da;
			});
		}
		if (sortType === "score")
			{
            answ.sort( (a, b) => b.score - a.score);
		}
			// $or: [ { "title": new RegExp(searchstring,'i')}, { "text": new RegExp(searchstring,'i') },{"answers.text": new RegExp(searchstring,'i')}]}).sort(sort)
			//{"answers.author":userdata}
			return callback(null, {
				success : true,
			  data : answ,
			  resultscount: answ.length
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