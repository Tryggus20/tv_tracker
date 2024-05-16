const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");


router.get("/", (req,res) => {
    const queryText = 'SELECT * FROM "shows" ORDER BY show_name ASC '
})