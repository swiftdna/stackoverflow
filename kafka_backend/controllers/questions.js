const Question = require('../models/question');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const helper = require('./helper');
const moment = require('moment');
const sqldb = require('../config/sqlConnect')
const util = require('util');
const _ = require('underscore');

const createQuestion = async (req, callback ) => {
	let {tags: inputTags} = req.body;
	if (!Array.isArray(inputTags) && typeof inputTags === 'string') {
		if (inputTags.indexOf(',')) {
			inputTags = inputTags.split(',');
		} else {
			inputTags = [inputTags];
		}
	}
	req.body.tags = inputTags;
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
	  await tags.forEach( async (tag) => {   
			//const usertags = await User.findOne({ '_id' : mongoose.Types.ObjectId(req.user.id),"tags_post_count.tag":{$exists:true}}]});
			await User.updateOne(
				{ '_id': mongoose.Types.ObjectId(req.user.id) },
				{ $inc: { [`tags_post_count.${tag}`]: 1 } }
			)
		});
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
		let question = await Question.find({}, {lean: true}).sort(sort);
		question && question.map(ques=>{
			if (ques.modified !== ques.created) {
                     ques.modifies=true
					 ques.time= ques.modified
			} else {
				ques.time= ques.created
			}
		});
        if (sortType === "time") {
            	question.sort( (a, b) => {
				let da = new Date(a.time),
				db = new Date(b.time);
				return db - da;
			});
		}
		if (req.query.tab === "score") {
			question.sort( (a, b) => { return b.score- a.score});
		}
		if (req.query.tab === "views") {
			question.sort( (a, b) => b.views- a.views);
		}
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
		var activity =[];
	  const  id  = req.params.questionid;
	  const question = await Question.findByIdAndUpdate(
		id,
		{ $inc: { views: 1 } },
		{ new: true }
	  ).populate('answers').lean();
		  if (question.created === question.modified)
		  {
		  activity.push({
		  type:'question',
		  author:question.author,
		  created:question.created,
	  })
	  }
	  else{
		activity.push({
			type:'question',
			author:question.author,
			created:question.created,
		})
		activity.push({
			type:'question_modified',
			author:question.author,
			created:question.modified,
		})  
	  }
	  question.answers.map(ans => {
		activity.push({
			type:'answer',
			author:ans.author,
			created:ans.created,
		}) 
		ans.comments.map(anscomment=>{
			activity.push({
				type:'answer_comment',
				author:anscomment.author,
				created:anscomment.created,
				comment : anscomment.body
			}) 	
		}) 
	  })
	  question.comments.map(ques => {
		activity.push({
			type:'question_comment',
			author:ques.author,
			created:ques.created,
			comment:ques.body,
		})  
	  })
	  activity.sort( (a, b) => {
		let da = new Date(a.created),
		db = new Date(b.created);
		return db - da;
	  });
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
	  question.createdFullText = moment(question.created).format('MMMM Do, YYYY at h:mm:ss a');
	  question.modifiedText = moment(question.modified).fromNow();
	  question.modifiedFullText = moment(question.modified).format('MMMM Do, YYYY h:mm:ss a');
	  return callback(null, {
		success: true,
		data : question,
		activityresult : activity
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
		const today = new Date().toISOString().slice(0, 10)
console.log('todaydateis',today);
	  const questions = await Question.find({
	  }).sort({created:-1});
	  let count=0;
	  //console.log(questions)
	  
	  questions.map(ques=>
		{
            const create= ques.created.toISOString().slice(0, 10);
			console.log('converrted date',create);
			   if (create === today)
			{
				   count=count+1
			 }
		   
		})
		//console.log(questions)
	  return callback(null, {
		  success : true,
		questionpostedcount : count
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
		if(req.query.key === 'tag') {
			const tags =req.query.value;
			const data = tags.split(" ");
			let tagdata= data[0];
			data.shift();
			const queryDB = util.promisify(sqldb.query).bind(sqldb);
			let tagdesc = await queryDB(`SELECT tagDescription FROM tags WHERE tagName =? `,[tagdata
				]);
			console.log('===> ', tagdesc);
			const searchstring = data.join('');
			if (tagdata.indexOf('[') === 0 && tagdata.indexOf(']') !== -1) {
				tagdata = tags.match(/[^[\]]+(?=])/g)[0]
			}
			console.log(tagdata, searchstring);
			let questions = await Question.find({ tags: { $all: tagdata }, $or: [ { "title": new RegExp(searchstring,'i')}, { "text": new RegExp(searchstring,'i') }]}).lean()
			
			console.log("initial questions are",(questions))
    
			for (let i = 0; i < questions.length; i++) {
				questions[i].type="question";
				questions[i].time=questions[i].created;
				questions[i].createdText = moment(questions[i].created).fromNow();
				questions[i].createdFullText = moment(questions[i].created).format('MMMM Do, YYYY at h:mm:ss a');
				questions[i].modifiedText = moment(questions[i].modified).fromNow();
				questions[i].modifiedFullText = moment(questions[i].modified).format('MMMM Do, YYYY h:mm:ss a');
			}
			const quesid =_.pluck(questions,'_id');
			
			let answ = await Question.find({ tags: { $all: tagdata },"answers.text": new RegExp(searchstring,'i'),_id:{$nin:quesid}}).lean();
			console.log("initial answ",answ);
			const regex = new RegExp(searchstring,'i')
			for (let j = 0;   j< answ.length; j++) {
				let count =0;
				for (let k = 0; k < answ[j].answers.length; k++)
				{
					if (regex.test(answ[j].answers[k].text ))
					{
						if (count <1){
							answ[j].time=answ[j].answers[k].created;
							answ[j].ansauthor=answ[j].answers[k].author;
							count=count+1
							}
							else
							{
								if (answ[j].time < answ[j].answers[k].created)
								{
									answ[j].time=answ[j].answers[k].created;
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
			if (sortType === "time")
			{
            consolidated.sort( (a, b) => {
				let da = new Date(a.time),
			db = new Date(b.time);
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
			  resultscount :consolidated.length,
			  tagdesc : tagdesc
		  });
		}
		//user_tag search
		// userid_tag search
		if(req.query.key === 'user_tag')
		{
			const tags =req.query.value;
			const data = tags.split(" ");
			const userdata = data[0];
			let tagdata= data[1];
			data.shift();
			if (tagdata.indexOf('[') === 0 && tagdata.indexOf(']') !== -1) {
				tagdata = tags.match(/[^[\]]+(?=])/g)[0]
			}
			const question = await Question.find({$and:[{author : userdata},{tags: { $all: tagdata }}]}).lean()
			const queryDB = util.promisify(sqldb.query).bind(sqldb);
			let tagdesc = await queryDB(`SELECT tagDescription FROM tags WHERE tagName =? `,[tagdata
				]);
			console.log('===> ', tagdesc);
			question.map(ques=>{
				if (ques.modified !== ques.created)
				{
						 ques.modifies=true
						 ques.time= ques.modified
				}
			else{
				ques.time= ques.created
			}})
			if (sortType === "time")
			{
            question.sort( (a, b) => {
				let da = new Date(a.time),
			db = new Date(b.time);
		return db - da;
			});
		}
		if (sortType === "score")
			{
            question.sort( (a, b) => b.score - a.score);
		}
			//console.log("consolidated data are",consolidated)
			
			return callback(null, {
				success : true,
			  data : question,
			  resultscount :question.length,
			  tagdesc : tagdesc
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
				questions[i].time=questions[i].created;			
			}
			const quesid =_.pluck(questions,'_id');
			const regex = new RegExp(req.query.value,'i')
			const answ = await Question.find({"answers.text": new RegExp(req.query.value,'i'),_id:{$nin:quesid}}).lean()
			for (let j = 0;   j< answ.length; j++) {
				let count=0
				for (let k = 0; k < answ[j].answers.length; k++)
				{
					if (regex.test(answ[j].answers[k].text ))
					{
						if (count <1){
							answ[j].time=answ[j].answers[k].created;
							answ[j].ansauthor=answ[j].answers[k].author;
							count=count+1
							}
							else
							{
								if (answ[j].time < answ[j].answers[k].created)
								{
									answ[j].time=answ[j].answers[k].created;
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
			if (sortType === "time")
			{
            consolidated.sort( (a, b) => {
				let da = new Date(a.time),
			db = new Date(b.time);
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
			  resultscount :consolidated.length
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
				questions[i].time=questions[i].created;			
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
							answ[j].time=answ[j].answers[k].created;
							answ[j].ansauthor=answ[j].answers[k].author;
							count=count+1
							}
							else
							{
								if (answ[j].time < answ[j].answers[k].created)
								{
									answ[j].time=answ[j].answers[k].created;
									answ[j].ansauthor=answ[j].answers[k].author;
								}
							}
					}
				}
				
				answ[j].type='answer';
			}
			let consolidated = questions.concat(answ);
			// sorting based on score or newest
			if (sortType === "time")
			{
            consolidated.sort( (a, b) => {
				let da = new Date(a.time),
			db = new Date(b.time);
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
			  resultscount :consolidated.length
		  });
		}
		else if(req.query.key === 'question')
		{
			const quessearch = req.query.value
			const questions = await Question.find({$or: [ { "title": new RegExp(quessearch,'i')}, { "text": new RegExp(quessearch,'i') }]}).lean();
			if (sortType === "time")
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
						answ[j].time=answ[j].answers[k].created;
						answ[j].ansauthor=answ[j].answers[k].author;
						count=count+1
						}
						else
						{
							if (answ[j].time < answ[j].answers[k].created)
							{
								answ[j].time=answ[j].answers[k].created;
								answ[j].ansauthor=answ[j].answers[k].author;
							}
						}
					}
				}
				answ[j].type='answer';
			}
			if (sortType === "time") {
            answ.sort( (a, b) => {
				let da = new Date(a.time);
				db = new Date(b.time);
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