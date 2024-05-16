-- quick db schema. may make it more complex depending on features wanted
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
