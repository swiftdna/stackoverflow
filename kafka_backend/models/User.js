const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userTagSchema = require("./usertags");

const userModel = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  profilePhoto: {
    type: String,
    default: function () {
      return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
    },
  },
  created: { type: Date, default: Date.now },
  location: { type: String, default: null },
  Reputation: { type: Number, default: 0 },
  lastseen: { type: Date, default: null },
  about: { type: String, default: null },
  tags_score: { type: Object },
  tags_post_count: { type: Object },
  username: { type: String, default: null },
});

userModel.set("toJSON", { getters: true });
userModel.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("user", userModel);
