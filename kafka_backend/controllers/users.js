const Question = require('../models/question');
const User = require('../models/User');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const getUserDetails = async (req, callback ) => {
	try {
       
      if (req.query.search){
	  const users = await User.find({ email: { $regex: req.query.search, $options: 'i' }}).sort({Reputation : -1}).limit(5);
      return callback(null, {
        data : users
    });
}
else{
    const users = await User.find({}).sort({Reputation : -1});
    return callback(null, {
      data : users
  }); 
}
	} catch (error) {
        return callback(error,{
            success: false,
	    	message: error.message
        });
	}
  };

  const getUserStats = async (req, callback ) => {
	try {
      //const author = req.user.id;
      const questions = await Question.find({author:author})
      const questionscount = await Question.find({author:req.user.id}).countDocuments();
      const answers = await Question.aggregate([
        {$match: {"answers.author" : mongoose.Types.ObjectId(req.user.id)}},
        { "$group": {
            "_id": null,
            "count": {
                "$sum": {
                    "$size": {
                        "$filter": {
                            "input": "$answers",
                            "as": "el",
                            "cond": {
                                "$eq": [ "$$el.author",  mongoose.Types.ObjectId(req.user.id)]
                            }
                        }
                    }
                }
            }
        }}
    ])
    const viewed = await Question.aggregate([
        {$match: {"author" : mongoose.Types.ObjectId(req.user.id)}},
        {$group:
        {
          _id : '',
          totalCount: { $sum: "$views" } },
        
    }
    ])
      const data = {
          questionscount : questionscount,
          answerscount : answers[0].count,
          viewscount : viewed[0].totalCount
      }
      return callback(null,{ data})
	} catch (error) {
        return callback(error,{
            success: false,
	    	message: error.message
        });
	}
  };

  const editUserDetails = async (req, callback ) => {

	try {
       
        const user = await User.findOneAndUpdate({email:req.user.email},req.body,{upsert:true, new:true});
        return callback(null,{ data : user})
	} catch (error) {
        return callback(error,{
            success: false,
	    	message: error.message
        });
	}
  };

  const userActivity = async (req, callback ) => {

    try {
      if (req.query.tab === 'answers')
         {
          const user = await Question.aggregate([ {
            $match :
                         { "answers.author" : mongoose.Types.ObjectId(req.user.id) },
                },
         {
            $project : {
              "title" : 1,
              "tags":1,
              "score":1,
                answers : {
                   $filter: {
                      input : "$answers",
                      as : "answer",
                      cond : 
                            { "$eq" : [ "$$answer.author", mongoose.Types.ObjectId(req.user.id) ] },
                   }
                }
            }
         }
         ])
        
          return callback(null,{ data : user})
        }
        if (req.query.tab === 'questions')
         {
          const user = await Question.find({author : req.user.id})
        
          return callback(null,{ data : user})
        }
        if (req.query.tab === 'tags')
         {
          const user = await User.findById(
                         { "_id" : mongoose.Types.ObjectId(req.user.id) })
          return callback(null,{ data : user})
        }
        if (req.query.tab === 'bookmarks')
         {
          const user = await Question.find(
                         { "bookmarks.user" : mongoose.Types.ObjectId(req.user.id) })
          return callback(null,{ data : user})
        }
    } catch (error) {
          return callback(error,{
              success: false,
          message: error.message
          });
    }
    };

  module.exports = {
	getUserDetails,
    getUserStats,
    editUserDetails,
    userActivity
  }