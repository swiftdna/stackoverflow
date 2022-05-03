const upvote = async (req, callback) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, 1);
      const question = await req.question.save();
      return callback(null, {
        data : question
    });
    }
    const question = await req.question.vote(id, 1);
    return callback(null, {
        data : question
    });
};
  
const downvote = async (req, callback) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, -1);
      const question = await req.question.save();
      return callback(null, {
        data : question
    });
    }
    const question = await req.question.vote(id, -1);
    return callback(null, {
        data : question
    });
}
  
const unvote = async (req, callback) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, 0);
      const question = await req.question.save();
      return callback(null, {
        data : question
    });
    }
    const question = await req.question.vote(id, 0);
    return callback(null, {
        data : question
    });
};
module.exports = {
	upvote,
	downvote,
    unvote
};