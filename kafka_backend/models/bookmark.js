const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    created: { type: Date, default: Date.now }
  },
  { _id: false }
);

module.exports = bookmarkSchema