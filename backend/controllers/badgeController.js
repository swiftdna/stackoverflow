const User = require('../models/user')
const Question = require('../models/question')

const getBadgesById = async (req, res) => {
  const userID = req.params.userID

  const user = await User.findOne({ _id: userID })
  const question = await Question.find({ author: userID })

  const allquestions = await Question.find({})
  let questionsLen = question.length
  var badges = []
  var flag = false
  for (const property in user.tags_score) {
    var temp = `${user.tags_score[property]}`
    var badgeStringValue
    if (temp <= 10) {
      badgeStringValue = 'Bronze'
      flag = true
    } else if (temp <= 15) {
      badgeStringValue = 'Silver'
      flag = true
    } else {
      badgeStringValue = 'Gold'
      flag = true
    }
    var badge = {
      badgeName: `${property}`,
      badgeValue: badgeStringValue,
      count: 1,
    }
    if (flag) {
      badges.push(badge)
    }
    flag = false
  }

  // -----------------------
  // Custom badges
  // Curious: Based on number of questions asked.
  var customBadge = 'Curious'
  var customBadgeValue
  if (questionsLen > 0 && questionsLen <= 2) {
    customBadgeValue = 'Bronze'
    flag = true
  } else if (questionsLen > 2 && questionsLen < 5) {
    customBadgeValue = 'Silver'
    flag = true
  } else if (questionsLen >= 5) {
    customBadgeValue = 'Gold'
    flag = true
  }
  var badge = {
    badgeName: customBadge,
    badgeValue: customBadgeValue,
    count: 1,
  }
  if (flag) {
    badges.push(badge)
  }
  flag = false

  // ------------------------
  // Popular: Based on the reputation
  customBadge = 'Popular'
  var reputation = user.Reputation
  console.log(reputation)
  if (reputation > 0 && reputation <= 10) {
    customBadgeValue = 'Bronze'
    flag = true
  } else if (reputation > 10 && reputation < 15) {
    customBadgeValue = 'Silver'
    flag = true
  } else if (reputation >= 15) {
    customBadgeValue = 'Gold'
    flag = true
  }
  badge = {
    badgeName: customBadge,
    badgeValue: customBadgeValue,
    count: 1,
  }
  if (flag) {
    badges.push(badge)
  }
  flag = false
  //Helpfulness: Based on the number of answers answered
  customBadge = 'Helpfulness'
  answerCount = 0
  for (let i = 0; i < allquestions.length; i++) {
    let answers = allquestions[i].answers
    for (let j = 0; j < answers.length; j++) {
      if (answers[j].author == userID) {
        answerCount++
      }
    }
  }
  if (answerCount > 0 && answerCount <= 2) {
    customBadgeValue = 'Bronze'
    flag = true
  } else if (answerCount > 2 && answerCount < 5) {
    customBadgeValue = 'Silver'
    flag = true
  } else if (answerCount >= 5) {
    customBadgeValue = 'Gold'
    flag = true
  }

  badge = {
    badgeName: customBadge,
    badgeValue: customBadgeValue,
    count: 1,
  }
  if (flag) {
    badges.push(badge)
  }
  flag = false

  //Sportsmanship: Based on the number of upvotes given
  //Critic: Based on the number of downvotes given
  customBadge = 'Sportsmanship'
  let criticBadge = 'Critic'
  upvoteCount = 0
  downvoteCount = 0
  for (let i = 0; i < allquestions.length; i++) {
    let votes = allquestions[i].votes
    for (let j = 0; j < votes.length; j++) {
      if (votes[j].user == userID && votes[j].vote == 1) {
        upvoteCount++
      }
      if (votes[j].user == userID && votes[j].vote == -1) {
        downvoteCount++
      }
    }
  }
  if (upvoteCount > 0 && upvoteCount <= 2) {
    customBadgeValue = 'Bronze'
    flag = true
  } else if (upvoteCount > 2 && upvoteCount < 5) {
    customBadgeValue = 'Silver'
    flag = true
  } else if (upvoteCount >= 5) {
    customBadgeValue = 'Gold'
    flag = true
  }
  badge = {
    badgeName: customBadge,
    badgeValue: customBadgeValue,
    count: 1,
  }
  if (flag) {
    badges.push(badge)
  }
  flag = false

  // For critic badge
  if (downvoteCount > 0 && downvoteCount <= 2) {
    customBadgeValue = 'Bronze'
    flag = true
  } else if (downvoteCount > 2 && downvoteCount < 5) {
    customBadgeValue = 'Silver'
    flag = true
  } else if (downvoteCount >= 5) {
    customBadgeValue = 'Gold'
    flag = true
  }
  badge = {
    badgeName: criticBadge,
    badgeValue: customBadgeValue,
    count: 1,
  }
  if (flag) {
    badges.push(badge)
  }
  flag = false

  // Gold badge: Notable Question: receives more than 5 views
  //Gold badge: Famous Question: receives more than 15 views
  let NotableBadge = 'Notable Question'
  let FamousBagde = 'Famous Question'
  let NotablebadgeCount = 0
  let FamousbadgeCount = 0
  for (let i = 0; i < question.length; i++) {
    let views = question[i].views
    if (views > 15) {
      FamousbadgeCount++
    } else if (views > 5) {
      NotablebadgeCount++
    }
  }
  badge = {
    badgeName: NotableBadge,
    badgeValue: 'Gold',
    count: NotablebadgeCount,
  }
  if (NotablebadgeCount > 0) {
    badges.push(badge)
  }

  badge = {
    badgeName: FamousBagde,
    badgeValue: 'Gold',
    count: FamousbadgeCount,
  }
  if (FamousbadgeCount > 0) {
    badges.push(badge)
  }

  try {
    if (user) {
      res.status(200).json(badges)
    } else {
      res.status(201).json({
        message: 'No Users Available',
      })
    }
  } catch (error) {
    throw new Error('Internal Server Error')
  }
}

module.exports = {
  getBadgesById,
}
