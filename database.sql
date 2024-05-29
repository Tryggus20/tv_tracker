-- quick db schema. may make it more complex depending on features wanted
-- TODO: update to current db schema
CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    show_name VARCHAR(150),
    season INT,
    episode INT,
    genre VARCHAR(100),
    notes VARCHAR(1000),
    series_ended BOOLEAN,
    is_completed BOOLEAN,
    last_updated TIMESTAMP
);

INSERT INTO shows (show_name, season, episode, genre, notes, series_ended, is_completed, last_updated)
VALUES ('Game of Thrones', 1, 1, 'fantasy', NULL, true, false, NOW());