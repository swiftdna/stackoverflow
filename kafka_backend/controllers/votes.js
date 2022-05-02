const upvote = async (req, res) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, 1);
      const question = await req.question.save();
      return res.json(question);
    }
    const question = await req.question.vote(id, 1);
    return res.json(question);
};
  
const downvote = async (req, res) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, -1);
      const question = await req.question.save();
      return res.json(question);
    }
    const question = await req.question.vote(id, -1);
    return res.json(question);
};
  
const unvote = async (req, res) => {
    const { id } = req.user;
  
    if (req.answer) {
      req.answer.vote(id, 0);
      const question = await req.question.save();
      return res.json(question);
    }
    const question = await req.question.vote(id, 0);
    return res.json(question);
};
module.exports = {
	upvote,
	downvote,
    unvote
};