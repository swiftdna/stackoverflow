const messages = require('../models/messages')
const User = require('../models/user')

const getallmessages = async (req, res) => {
  const s_ID = req.params.sender_ID
  const r_ID = req.params.recepient_ID

  const messagesfromUser = await messages.find({
    $and: [{ sender_ID: s_ID }, { recepient_ID: r_ID }],
  })

  const messagestoUser = await messages.find({
    $and: [{ sender_ID: r_ID }, { recepient_ID: s_ID }],
  })

  //console.log(messagestoUser)
  //messagesfromUser.push(messagestoUser)
  for (let i = 0; i < messagestoUser.length; i++) {
    messagesfromUser.push(messagestoUser[i])
  }

  messagesfromUser.sort(function (a, b) {
    return a.createdAt - b.createdAt
  })
  console.log(messagesfromUser)

  try {
    if (messagesfromUser || messagestoUser) {
      res.status(201).json({
        success: true,
        data: messagesfromUser,
      })
    } else {
      res.status(201).json({
        success: false,
        message: 'No Recipients found',
      })
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const getallRecipients = async (req, res) => {
  const s_ID = req.params.sender_ID
  //const r_ID = req.params.recepient_ID
  const messagesfromUser = await messages.find({ sender_ID: s_ID })
  const messagestoUser = await messages.find({ recepient_ID: s_ID })

  var result = []
  const recipientSet = new Set()

  try {
    if (messagesfromUser || messagestoUser) {
      for (let i = 0; i < messagesfromUser.length; i++) {
        var rec_id = messagesfromUser[i].recepient_ID.valueOf()

        recipientSet.add(rec_id)
      }
      for (let i = 0; i < messagestoUser.length; i++) {
        var sen_id = messagestoUser[i].sender_ID.valueOf()
        recipientSet.add(sen_id)
      }
      for (let item of recipientSet) {
        console.log(item)
        var user = await User.findOne({ _id: item })
        result.push(user.username)
      }
      res.status(200).json({
        success: true,
        data: result,
      })
    } else {
      res.status(201).json({
        success: false,
        message: 'No Recipients found',
      })
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const addMessage = async (req, res) => {
  const sid = req.body.sender_ID
  const rid = req.body.recepient_ID
  const content = req.body.content

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
