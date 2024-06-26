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
    last_updated TIMESTAMP,
    tvmaze_id VARCHAR(1000),
    image_url VARCHAR(1000),
    show_synopsis VARCHAR(2000),
    release_date VARCHAR(100),
    user_email VARCHAR(255)
);
