const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessagesSchema = mongoose.Schema(
  {
    sender_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    recepient_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
)

const messages = mongoose.model('messages', MessagesSchema)
module.exports = messages
