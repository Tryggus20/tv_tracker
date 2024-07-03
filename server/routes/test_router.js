const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");


router.get('/api/test', async (req, res) => {
    try {
      const result = await db.query('SELECT NOW()');
      res.json({ message: 'Connection successful', time: result.rows[0] });
    } catch (error) {
      console.error('Error connecting to the database', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
