const express = require("express");
const bodyParser = require("body-parser");
const tvRouter = require("./routes/tv_router.js");
const app = express();

// App Set //
const PORT = process.env.PORT || 5000;

// Parse incoming JSON requests
app.use(bodyParser.json());

// Define API routes
app.use("/api/tv", tvRouter);

// Serve static files from the React app
app.use(express.static("build"));

// Catch-all handler for any requests that don't match API routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
