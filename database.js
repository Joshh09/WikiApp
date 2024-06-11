const mongoose = require("mongoose");

// Establish connection to MongoDB
mongoose.connect(
  process.env['DATABASE'], { })
    .then(() => console.log("Connected"))
    .catch(err => console.log(err))