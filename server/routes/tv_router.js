const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");



// GET ROUTE
router.get("/", (req, res) => {
  const queryText = 'SELECT * FROM "shows" ORDER BY show_name ASC';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in Get all shows", err);
      res.sendStatus(500);
    });
});


// POST ROUTE
router.post("/", (req, res) => {
  const newShow = req.body;
  const queryText = ` INSERT INTO "shows" (show_name, season, episode, genre, notes, series_ended, is_completed, last_updated ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

  const values = [
    newShow.show_name,
    newShow.season,
    newShow.episode,
    newShow.genre,
    newShow.notes,
    newShow.series_ended,
    newShow.is_completed,
    newShow.last_updated,
  ];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("Error in POST new show, err");
      res.sendStatus(500);
    });
});


//UPDATE ROUTE
router.put("/:id", (req, res) => {
    
})

// DELETE ROUTE
router.delete("/:id", (req, res) => {
    const showId = req.params.id;
    const queryText = `DELETE "shows" where "id" = $1`;

    pool.query(queryText, [showId]).then (() => res.sendStatus(200)) // 200 = ok to confirm deleted
    .catch((err) => {
        console.error("Error in DELETE show, err");
        res.sendStatus(500);
    });
});


module.exports = router

