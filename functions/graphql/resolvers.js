const pool = require('../modules/pool');

const resolvers = {
  Query: {
    shows: async (_, { user_email }) => {
      const queryText = 'SELECT * FROM shows WHERE user_email = $1 ORDER BY show_name ASC';
      const { rows } = await pool.query(queryText, [user_email]);
      return rows;
    },
    show: async (_, { id }) => {
      const queryText = 'SELECT * FROM shows WHERE id = $1';
      const { rows } = await pool.query(queryText, [id]);
      return rows[0];
    },
  },
  Mutation: {
    addShow: async (_, args) => {
      const {
        show_name, season, episode, genre, notes,
        series_ended, is_completed, last_updated,
        tvmaze_id, image_url, show_synopsis, release_date, user_email
      } = args;
      const queryText = `
        INSERT INTO shows (
          show_name, season, episode, genre, notes, series_ended,
          is_completed, last_updated, tvmaze_id, image_url, show_synopsis,
          release_date, user_email
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
      `;
      const values = [
        show_name, season, episode, genre, notes, series_ended,
        is_completed, last_updated, tvmaze_id, image_url, show_synopsis,
        release_date, user_email
      ];
      const { rows } = await pool.query(queryText, values);
      return rows[0];
    },
    updateShow: async (_, { id, season, episode }) => {
      if (season !== undefined) {
        await pool.query('UPDATE shows SET season = $1 WHERE id = $2', [season, id]);
      }
      if (episode !== undefined) {
        await pool.query('UPDATE shows SET episode = $1 WHERE id = $2', [episode, id]);
      }
      const queryText = 'SELECT * FROM shows WHERE id = $1';
      const { rows } = await pool.query(queryText, [id]);
      return rows[0];
    },
    deleteShow: async (_, { id }) => {
      const queryText = 'DELETE FROM shows WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(queryText, [id]);
      return rows[0];
    },
  },
};

module.exports = resolvers;
