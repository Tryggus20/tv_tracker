const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET ROUTE
router.get("/", (req, res) => {
  const userEmail = req.headers["user-email"];
  const queryText =
    'SELECT * FROM "shows" WHERE "user_email" = $1 ORDER BY show_name ASC';

  pool
    .query(queryText, [userEmail])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in Get user shows", err);
      res.sendStatus(500);
    });
});

// TODO: REMOVE TEST GET TO MAKE SURE DEPLOYED DB IS WORKING
// router.get("/", (req, res) => {
//   const userEmail = req.headers['user-email']
//   console.log(userEmail);;
//   const queryText = 'SELECT * FROM "shows" ORDER BY show_name ASC';

//   pool
//     .query(queryText)
//     .then((result) => res.send(result.rows))
//     .catch((err) => {
//       console.error("Error in Get user shows", err);
//       res.sendStatus(500);
//     });
// });

// POST ROUTE
router.post("/", (req, res) => {
  const {
    name,
    season,
    episode,
    genre,
    notes,
    doneAiring,
    caughtUp,
    lastUpdated,
    tvmaze_id,
    image_url,
    show_synopsis,
    user_email,
  } = req.body;
  const queryText = ` INSERT INTO "shows" (show_name, season, episode, genre, notes, series_ended, is_completed, last_updated, tvmaze_id, image_url, show_synopsis, user_email ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

  const values = [
    name,
    season,
    episode,
    genre,
    notes,
    doneAiring,
    caughtUp,
    lastUpdated,
    tvmaze_id,
    image_url,
    show_synopsis,
    user_email,
  ];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("Error in POST new show", err);
      res.sendStatus(500);
    });
});

//PUT ROUTE
// router.put("/:id", (req, res) => {
//   const showId = req.params.id;
//   const updatedShow = req.body;
//   const queryText = `UPDATE "shows" SET "show_name" = $1, "season" = $2, "episode" = $3, "genre" = $4, "notes" = $5, "series_ended" = $6, "is_completed" = $7, "last_updated" = $8 `;
//   const values = [
//     updatedShow.show_name,
//     updatedShow.season,
//     updatedShow.episode,
//     updatedShow.genre,
//     updatedShow.notes,
//     updatedShow.series_ended,
//     updatedShow.is_completed,
//     updatedShow.last_updated,
//   ];
//   pool
//     .query(queryText, values)
//     .then(() => res.sendStatus(204))
//     .catch((err) => {
//       console.error("Error in Put update show", err);
//       res.sendStatus(500);
//     });
// });

// There has to be a better way to conditionally save data
// But this should work for this case and for right now
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { notes, series_ended, is_completed, release_date } = req.body;
console.log("edit info:", req.params, req.body );
  try {
    const fields = [];
    const values = [];
    let index = 1;

    if (notes !== undefined) {
      fields.push(`notes = $${index++}`);
      values.push(notes);
    }
    if (series_ended !== undefined) {
      fields.push(`series_ended = $${index++}`);
      values.push(series_ended);
    }
    if (is_completed !== undefined) {
      fields.push(`is_completed = $${index++}`);
      values.push(is_completed);
    }
    if (release_date !== undefined) {
      fields.push(`release_date = $${index++}`);
      values.push(release_date);
    }

    if (fields.length > 0) {
      const setClause = fields.join(", ");
      const query = `UPDATE shows SET ${setClause} WHERE id = $${index}`;
      values.push(id);

      await pool.query(query, values);
      res.sendStatus(200);
    } else {
      res.status(400).send("No fields to update");
    }
  } catch (error) {
    console.error("Error editing show:", error);
    res.sendStatus(500);
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { season, episode } = req.body;
  // TODO: if you update season, resets episode to 1?
  try {
    if (season !== undefined) {
      await pool.query("UPDATE shows SET season = $1 WHERE id = $2", [
        season,
        id,
      ]);
    }
    if (episode !== undefined) {
      await pool.query("UPDATE shows SET episode = $1 WHERE id = $2", [
        episode,
        id,
      ]);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating show:", error);
    res.sendStatus(500);
  }
});

// DELETE ROUTE
router.delete("/:id", (req, res) => {
  const showId = req.params.id;
  const queryText = `DELETE "shows" where "id" = $1`;

  pool
    .query(queryText, [showId])
    .then(() => res.sendStatus(200)) // 200 = ok to confirm deleted
    .catch((err) => {
      console.error("Error in DELETE show, err");
      res.sendStatus(500);
    });
});

module.exports = router;
