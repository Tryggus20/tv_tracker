const express = require("express");
const bodyParser = require("body-parser");
const tvRouter = require("./routes/tv_router.js");


// Serve static files
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

app.use("/api/tv", tvRouter);

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


