const messages = require('../models/messages')
const User = require('../models/user')

const getallmessages = async (req, res) => {
  const {id: s_ID} = req.user;
  const r_ID = req.params.recepient_ID;

  const messagesfromUser = await messages.find({
    $and: [{ sender_ID: s_ID }, { recepient_ID: r_ID }],
  }, {}, {lean: true});

  const messagestoUser = await messages.find({
    $and: [{ sender_ID: r_ID }, { recepient_ID: s_ID }],
  }, {}, {lean: true});

  const recipientDetails = await User.findOne({ _id: r_ID }, {}, {lean: true});

  //console.log(messagestoUser)
  //messagesfromUser.push(messagestoUser)
  for (let i = 0; i < messagestoUser.length; i++) {
    messagesfromUser.push(messagestoUser[i]);
  }

  messagesfromUser.sort(function (a, b) {
    return a.createdAt - b.createdAt
  });

  messagesfromUser.map(user => {
    if (user && user.sender_ID) {
      const userIDFromDB = user.sender_ID.toString();
      if (userIDFromDB === s_ID) {
        user.sender = true;
      } else {
        user.sender = false;
        user.recipient = recipientDetails;
      }
    }
  });

  try {
    if (messagesfromUser || messagestoUser) {
      res.json({
        success: true,
        data: messagesfromUser,
      })
    } else {
      res.json({
        success: false,
        message: 'No Recipients found',
      })
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getallRecipients = async (req, res) => {
  // const s_ID = req.params.sender_ID;
  const {id: s_ID} = req.user;
  console.log('checking for user => ', s_ID);
  //const r_ID = req.params.recepient_ID
  const messagesfromUser = await messages.find({ sender_ID: s_ID })
  const messagestoUser = await messages.find({ recepient_ID: s_ID })

  const result = [];
  const recipientSet = new Set();

  try {
    if (messagesfromUser || messagestoUser) {
      for (let i = 0; i < messagesfromUser.length; i++) {
        var rec_id = messagesfromUser[i].recepient_ID.valueOf();
        recipientSet.add(rec_id)
      }
      for (let i = 0; i < messagestoUser.length; i++) {
        var sen_id = messagestoUser[i].sender_ID.valueOf()
        recipientSet.add(sen_id)
      }
      for (let item of recipientSet) {
        console.log(item)
        var user = await User.findOne({ _id: item })
        result.push({username: user.username, id: user._id});
      }
      res.status(200).json({
        success: true,
        data: result,
      })
    } else {
      res.json({
        success: false,
        message: 'No Recipients found',
      })
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const addMessage = async (req, res) => {
  // const sid = req.body.sender_ID
  const {id: sid} = req.user;
  const rid = req.body.recipientID;
  const content = req.body.content;

  try {
    const newMessage = new messages({
      sender_ID: sid,
      recepient_ID: rid,
      content: content,
    })

    const createdMessage = await messages.create(newMessage)
    if (createdMessage) {
      res.status(201).json({
        success: true,
        message: 'Message Added Successfully',
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Message Not Added Successfully',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { addMessage, getallRecipients, getallmessages }
