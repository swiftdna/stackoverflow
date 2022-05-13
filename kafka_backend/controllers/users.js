const Question = require("../models/question");
const User = require("../models/User");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const getUserDetails = async (req, callback) => {
  try {
    if (req.query.search) {
      const users = await User.find({
        email: { $regex: req.query.search, $options: "i" },
      })
        .sort({ Reputation: -1 })
        .limit(5);
      return callback(null, {
        data: users,
      });
    } else {
      const users = await User.find({}).sort({ Reputation: -1 });
      return callback(null, {
        data: users,
      });
    }
  } catch (error) {
    return callback(error, {
      success: false,
      message: error.message,
    });
  }
};

const userTagQuestions = async (req, callback) => {
  try {
    const users = await Question.find({
      $and: [{ author: req.body.id }, { tags: { $all: req.body.tag } }],
    }).lean();
    return callback(null, {
      data: users,
    });
  } catch (error) {
    return callback(error, {
      success: false,
      message: error.message,
    });
  }
};

const getTopUserReputation = async (req, callback) => {
  try {
    const users = await User.find({}).lean().sort({ Reputation: -1 }).limit(10);
    return callback(null, {
      data: users,
    });
  } catch (error) {
    return callback(error, {
      success: false,
      message: error.message,
    });
  }
};
const getLeastUserReputation = async (req, callback) => {
  try {
    const users = await User.find({}).lean().sort({ Reputation: 1 }).limit(10);
    return callback(null, {
      data: users,
    });
  } catch (error) {
    return callback(error, {
      success: false,
      message: error.message,
    });
  }
};
const getUserStats = async (req, callback) => {
  try {
    //const author = req.us.id;
    const questions = await Question.find({ author: req.body.id });
    const questionscount = await Question.find({
      author: req.body.id,
    }).countDocuments();
    const reputationcount = await User.find(
      { _id: mongoose.Types.ObjectId(req.body.id) },
      { Reputation: 1 }
    );
    const answers = await Question.aggregate([
      { $match: { "answers.author": mongoose.Types.ObjectId(req.body.id) } },
      {
        $group: {
          _id: null,
          count: {
            $sum: {
              $size: {
                $filter: {
                  input: "$answers",
                  as: "el",
                  cond: {
                    $eq: ["$$el.author", mongoose.Types.ObjectId(req.body.id)],
                  },
                },
              },
            },
          },
        },
      },
    ]);
    const viewed = await Question.aggregate([
      { $match: { author: mongoose.Types.ObjectId(req.body.id) } },
      {
        $group: {
          _id: "",
          totalCount: { $sum: "$views" },
        },
      },
    ]);
  
    const data = {
      questionscount: questionscount,
      answerscount: answers && answers.length && answers[0].count,
      viewscount: viewed && viewed.length && viewed[0].totalCount,
      reputationcount: reputationcount[0].Reputation,
    };
    return callback(null, { data });
  } catch (error) {
    return callback(error, {
      success: false,
      message: error.message,
    });
  }
};

const editUserDetails = async (req, callback) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      req.body,
      { upsert: true, new: true }
    );
    return callback(null, { data: user });
  } catch (error) {
    return callback(error, {
      success: false,
      message: error.message,
    });
  }
};

const topUserTags = async (req, callback) => {
  try {
    const user = await User.findById(
      { _id: mongoose.Types.ObjectId(req.body.id) },
      { tags_score: 1, tags_post_count: 1 }
    ).lean();
    //console.log(user[0].tags_score);
    if(user.tags_score)
    {
    let keys = Object.entries(user.tags_score).sort((a, b) => b[1] - a[1]);
    for (var i = 0; i < keys.length; i++) {
      if (user.tags_post_count[keys[i][0]] === undefined) {
        keys[i].push(0);
      } else {
        keys[i].push(user.tags_post_count[keys[i][0]]);
      }
    }

    return callback(null, {
      success: true,
      data: keys,
    });
  }
  else{
    return callback(null, {
      success: true,
      data: [],
    });
  }
  } catch (error) {
    return callback(error, {
      success: false,
      message: error.message,
    });
  }
};

// topuserposts
const topUserPosts = async (req, callback) => {
  let question = [];
  let answer = [];
  try {
    if (req.query.tab === "question" || req.query.tab === "all") {
      question = await Question.find({
        author: mongoose.Types.ObjectId(req.body.id),
      })
        .lean()
        .limit(10);
      console.log(question.length);
      question.map((ques) => {
        (ques.type = "question"),
          (ques.time = ques.created),
          (ques.votesscore = ques.score),
          ques.answers.map((answ) => {
            if (answ.isbestanswer === true) {
              ques.isbestanswer = true;
            }
          });
      });
    }
    if (req.query.tab === "answer" || req.query.tab === "all") {
      answer = await Question.aggregate([
        {
          $match: { "answers.author": mongoose.Types.ObjectId(req.body.id) },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            tags: 1,
            score: 1,
            answers: {
              $filter: {
                input: "$answers",
                as: "answer",
                cond: {
                  $eq: [
                    "$$answer.author",
                    mongoose.Types.ObjectId(req.body.id),
                  ],
                },
              },
            },
          },
        },
      ]).limit(10);
      console.log(answer.length);
      answer.map((answ) => {
        answ.answers.map((answdt) => {
          (answ.type = "answer"),
            (answ.time = answdt.created),
            (answ.votesscore = answdt.score);
          if (answdt.isbestanswer === true) {
            answ.isbestanswer = true;
          }
        });
      });
    }
    const consolidated = question.concat(answer);
    if (req.query.sortType === "time") {
      consolidated.sort((a, b) => {
        let da = new Date(a.time),
          db = new Date(b.time);
        return db - da;
      });
    }
    if (req.query.sortType === "score") {
      consolidated.sort((a, b) => b.votesscore - a.votesscore);
    }
    return callback(null, {
      data: consolidated,
      resultscount: consolidated.length,
    });
  } catch (error) {
    return callback(error, {
      success: false,
      message: error.message,
    });
  }
};

const userActivity = async (req, callback) => {
  try {
    if (req.query.tab === "answers") {
      const user = await Question.aggregate([
        {
          $match: { "answers.author": mongoose.Types.ObjectId(req.body.id) },
        },
        {
          $project: {
            title: 1,
            tags: 1,
            score: 1,
            answers: {
              $filter: {
                input: "$answers",
                as: "answer",
                cond: {
                  $eq: [
                    "$$answer.author",
                    mongoose.Types.ObjectId(req.body.id),
                  ],
                },
              },
            },
          },
        },
      ]);

      return callback(null, { data: user });
    }
    if (req.query.tab === "questions") {
      const user = await Question.find({ author: req.body.id });

      return callback(null, { data: user });
    }
    if (req.query.tab === "tags") {
      const user = await User.findById(
        { _id: mongoose.Types.ObjectId(req.body.id) },
        { tags_score: 1, tags_post_count: 1 }
      ).lean();
      //console.log(user[0].tags_score);
if(user.tags_score){
       console.log("-------sunny-----------")
       console.log(user.tags_score);
       console.log("----------------------")

      let keys = Object.entries(user.tags_score).sort((a, b) => b[1] - a[1]);
      for (var i = 0; i < keys.length; i++) {
        if (user.tags_post_count[keys[i][0]] === undefined) {
          keys[i].push(0);
        } else {
          keys[i].push(user.tags_post_count[keys[i][0]]);
        }
      }

      return callback(null, {
        success: true,
        data: keys,
      });
    }
    else{
      return callback(null, {
        success: true,
        data: [],
      });
    }
    }
    if (req.query.tab === "reputation") {
      try {
        const question = await Question.find({
          author: mongoose.Types.ObjectId(req.body.id),
        }).lean();
        //console.log(question.length);
        question.map((ques) => {
          (ques.type = "question"), (ques.reputationtime = ques.created);
          ques.reputation = 0;
          count = 0;
          // console.log(ques.votes);
          ques.votes &&
            ques.votes.length &&
            ques.votes.map((vote) => {
              if (vote.vote === 1) {
                if (ques.votes.length === count + 1) {
                  ques.reputationtime = vote.created;
                  ques.reputation = ques.reputation + 10;
                } else {
                  ques.reputation = ques.reputation + 10;
                  count = count + 1;
                }
              } else {
                if (ques.votes.length === count + 1) {
                  ques.reputationtime = vote.created;
                  ques.reputation = ques.reputation - 10;
                } else {
                  ques.reputation = ques.reputation - 10;
                  count = count + 1;
                }
              }
            });
        });

        const answer = await Question.aggregate([
          {
            $match: { "answers.author": mongoose.Types.ObjectId(req.body.id) },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              tags: 1,
              score: 1,
              answers: {
                $filter: {
                  input: "$answers",
                  as: "answer",
                  cond: {
                    $eq: [
                      "$$answer.author",
                      mongoose.Types.ObjectId(req.body.id),
                    ],
                  },
                },
              },
            },
          },
        ]);
        answer.map((answ) => {
          answ.answers.map((answdt) => {
            (answ.type = "answer"),
              (answ.reputationtime = answdt.created),
              (answ.reputation = 0);
            count = 0;

            //console.log('votes length',answdt.votes.length);
            answdt.votes &&
              answdt.votes.length &&
              answdt.votes.map((vote) => {
                if (vote.vote === 1) {
                  if (answdt.votes.length === count + 1) {
                    answ.reputationtime = vote.created;
                    answ.reputation = answ.reputation + 5;
                  } else {
                    answ.reputation = answ.reputation + 5;
                    count = count + 1;
                  }
                } else {
                  if (answdt.votes.length === count + 1) {
                    answ.reputationtime = vote.created;
                    answ.reputation = answ.reputation - 5;
                  } else {
                    answ.reputation = answ.reputation - 5;
                    count = count + 1;
                  }
                }
              });
            if (answdt.isbestanswer === true) {
              if (answ.reputationtime > answdt.isbestanswercreated) {
                answ.reputationtime = answdt.isbestanswercreated;
                answ.reputation = answ.reputation + 15;
              } else {
                answ.reputation = answ.reputation + 15;
              }
            }
          });
        });
        const consolidated = question.concat(answer);
        consolidated.sort((a, b) => {
          let da = new Date(a.reputationtime),
            db = new Date(b.reputationtime);
          return db - da;
        });

        return callback(null, {
          data: consolidated,
          resultscount: consolidated.length,
        });
      } catch (error) {
        return callback(error, {
          success: false,
          message: error.message,
        });
      }
    }
    if (req.query.tab === "bookmarks") {
      
      const user = await Question.find({
        "bookmarks.user": mongoose.Types.ObjectId(req.body.id),
      });
      return callback(null, { data: user });
    }
  } catch (error) {
    return callback(error, {
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUserDetails,
  getUserStats,
  editUserDetails,
  userActivity,
  topUserTags,
  topUserPosts,
  getLeastUserReputation,
  getTopUserReputation,
  userTagQuestions,
};