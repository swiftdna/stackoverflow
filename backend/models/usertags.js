const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTagSchema = new Schema(
  {
    tagname: { type: String, default:null },
    tagscore: { type: Number, default:0 },
    tagcount: { type: Number, default: 1}
  },
  { _id: false }
);

module.exports = userTagSchema