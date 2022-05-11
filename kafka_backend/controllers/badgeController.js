const User = require('../models/User')
const Question = require('../models/question')




const getBadgesById = async (req, callback ) => 
{    
    const userID = req.params.userID

    const user = await User.findOne({ _id: userID })
    const question = await Question.find({ author: userID })
    const allquestions = await Question.find({})
    console.log(allquestions)
    let questionsLen = question.length
    console.log(questionsLen)
    var badges = []
    for (const property in user && user.tags_score) {
        var temp = `${user.tags_score[property]}`
        var badgeStringValue
        if (temp <= 10) {
            badgeStringValue = 'Bronze'
        } else if (temp <= 15) {
            badgeStringValue = 'Silver'
        } else {
            badgeStringValue = 'Gold'
        }
        var badge = {
            badgeName: `${property}`,
            badgeValue: badgeStringValue,
            count: 1,
        }
        badges.push(badge)
    }


    // -----------------------
    // Custom badges
    // Curious: Based on number of questions asked.
    var customBadge = 'Curious'
    var customBadgeValue
    if (questionsLen <= 2) {
        customBadgeValue = 'Bronze'
    } else if (questionsLen > 2 && questionsLen < 5) {
        customBadgeValue = 'Silver'
    } else {
        customBadgeValue = 'Gold'
    }
    var badge = {
        badgeName: customBadge,
        badgeValue: customBadgeValue,
        count: 1,
    }
    badges.push(badge)

    // ------------------------
    // Popular: Based on the reputation
    customBadge = 'Popular'
    var reputation = user && user.Reputation
    console.log(reputation)
    if (reputation <= 10) {
        customBadgeValue = 'Bronze'
    } else if (reputation > 10 && reputation < 15) {
        customBadgeValue = 'Silver'
    } else {
        customBadgeValue = 'Gold'
    }
    badge = {
        badgeName: customBadge,
        badgeValue: customBadgeValue,
        count: 1,
    }
    badges.push(badge)

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
    if (answerCount <= 2) {
        customBadgeValue = 'Bronze'
    } else if (answerCount > 2 && answerCount < 5) {
        customBadgeValue = 'Silver'
    } else {
        customBadgeValue = 'Gold'
    }
    badge = {
        badgeName: customBadge,
        badgeValue: customBadgeValue,
        count: 1,
    }
    badges.push(badge)

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
    if (upvoteCount <= 2) {
        customBadgeValue = 'Bronze'
    } else if (upvoteCount > 2 && upvoteCount < 5) {
        customBadgeValue = 'Silver'
    } else {
        customBadgeValue = 'Gold'
    }
    badge = {
        badgeName: customBadge,
        badgeValue: customBadgeValue,
        count: 1,
    }
    badges.push(badge)

    // For critic badge
    if (downvoteCount <= 2) {
        customBadgeValue = 'Bronze'
    } else if (downvoteCount > 2 && downvoteCount < 5) {
        customBadgeValue = 'Silver'
    } else {
        customBadgeValue = 'Gold'
    }
    badge = {
        badgeName: criticBadge,
        badgeValue: customBadgeValue,
        count: 1,
    }
    badges.push(badge)

    // Gold badge: Notable Question: receives more than 5 views
    //Gold badge: Famous Question: receives more than 15 views
    let NotableBadge = 'Notable Question'
    let FamousBagde = 'Famous Question'
    let NotablebadgeCount = 0
    let FamousbadgeCount = 0
    for (let i = 0; i < allquestions.length; i++) {
        let views = allquestions[i].views
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
    badges.push(badge)
    badge = {
        badgeName: FamousBagde,
        badgeValue: 'Gold',
        count: FamousbadgeCount,
    }
    badges.push(badge)
    const goldBadges = badges.filter(bd => bd.badgeValue === 'Gold');
    let gold=0;
    goldBadges.map(dt=> {
      gold=gold+dt.count
	})
	  const silverBadges = badges.filter(bd => bd.badgeValue === 'Silver' );
      let silver=0;
    silverBadges.map(dt=> {
      silver=silver+dt.count
	})
	  const bronzeBadges = badges.filter(bd => bd.badgeValue === 'Bronze');
      let bronze=0;
    bronzeBadges.map(dt=> {
      bronze=bronze+dt.count
	})
    try {
        if (user) {
            const badgescount={Gold: gold,
                Silver: silver,
                Bronze: bronze}
            return callback(null, {
                success:true,
                data:badges,
                badgescount :badgescount
            });
        }
        return callback(null, {
            success:true,
            data:[],
          
        });
    } catch (error) {
        return callback(error, {
            success : false,
            message : error.message
        });
    }


}


module.exports = {
    getBadgesById,
}
