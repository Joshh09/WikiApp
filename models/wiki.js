const mongoose = require("mongoose");


// Schema for the user collection

const wikiSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 60
  },
  category: {
    type: String,
    required: true,
    enum: ["Technology"]
  },
  author: {
    type: String,
    required: true,
    maxLength: 40
  },
  urlName: {
    type: String,
    required: true,
    index: { // Index only gets created automatically for a new collection
      unique: true,
      collation: { locale: "en", strength: 2 } // case in-sensitive index
    },
    maxLength: 60,
    match: /^[a-zA-Z0-9-_]+$/
  },
  html: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pageViews: {
    type: Number,
    default: 0
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  updatedDate: {
    type: Date,
    default: Date.now()
  }
})


module.exports = mongoose.model("Wiki", wikiSchema);