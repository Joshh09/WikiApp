const express = require("express");
const database = require("./database.js");
const wikiRoutes = require("./routes/wikis.js");

const app = express();

app.use(express.static("./docs"));
app.use(express.json({limit: '5mb'}));

app.use("/api/wiki", wikiRoutes);


app.listen(3000, () => console.log("Server Started"));