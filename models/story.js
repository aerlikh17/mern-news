const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema(
    {
      source: { type: String, required: true },
      author: { type: String },
      title: { type: String, required: true },
      description: { type: String, required: true},
      content: { type: String},
      url: { type: String, required: true },
      urlToImage: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
      timestamps: true
  }
)

module.exports = mongoose.model("Story", storySchema);