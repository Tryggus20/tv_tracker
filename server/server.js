const express = require("express");
const bodyParser = require("body-parser");
const tvRouter = require("./routes/tv_router.js");
const app = express();
const pool = require("./modules/pool.js");
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
app.use(express.json());

app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connection successful', time: result.rows[0] });
  } catch (error) {
    console.error('Error connecting to the database', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
