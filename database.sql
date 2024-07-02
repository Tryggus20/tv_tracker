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

-- Insert test data into the shows table
INSERT INTO shows (show_name, season, episode, genre, notes, series_ended, is_completed, last_updated, tvmaze_id, image_url, show_synopsis, release_date, user_email) VALUES
('Breaking Bad', 5, 14, 'Drama', 'A chemistry teacher turned methamphetamine producer.', TRUE, TRUE, '2024-01-01 12:00:00', '123', 'https://example.com/breaking_bad.jpg', 'A high school chemistry teacher turned methamphetamine producer.', '2008-01-20', 'hello@hello.com'),
('Stranger Things', 4, 8, 'Science Fiction', 'A group of kids in the 1980s face strange occurrences in their town.', FALSE, FALSE, '2024-02-01 12:00:00', '456', 'https://example.com/stranger_things.jpg', 'A group of kids in the 1980s face strange occurrences in their town.', '2016-07-15', 'hello@hello.com'),
('Game of Thrones', 8, 6, 'Fantasy', 'Political and dynastic struggles in the Seven Kingdoms of Westeros.', TRUE, TRUE, '2024-03-01 12:00:00', '789', 'https://example.com/game_of_thrones.jpg', 'Political and dynastic struggles in the Seven Kingdoms of Westeros.', '2011-04-17', 'hello@hello.com'),
('The Witcher', 3, 8, 'Fantasy', 'The adventures of Geralt of Rivia, a monster hunter.', FALSE, FALSE, '2024-04-01 12:00:00', '101112', 'https://example.com/the_witcher.jpg', 'The adventures of Geralt of Rivia, a monster hunter.', '2019-12-20', 'hello@hello.com'),
('The Office', 9, 23, 'Comedy', 'A mockumentary on a group of typical office workers.', TRUE, TRUE, '2024-05-01 12:00:00', '131415', 'https://example.com/the_office.jpg', 'A mockumentary on a group of typical office workers.', '2005-03-24', 'hello@hello.com'),
('Friends', 10, 18, 'Comedy', 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.', TRUE, TRUE, '2024-06-01 12:00:00', '161718', 'https://example.com/friends.jpg', 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.', '1994-09-22', 'hello@hello.com'),
('The Mandalorian', 2, 8, 'Science Fiction', 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', FALSE, FALSE, '2024-07-01 12:00:00', '192021', 'https://example.com/the_mandalorian.jpg', 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', '2019-11-12', 'hello@hello.com'),
('The Crown', 4, 10, 'Drama', 'Chronicles the life of Queen Elizabeth II from the 1940s to modern times.', FALSE, FALSE, '2024-08-01 12:00:00', '222324', 'https://example.com/the_crown.jpg', 'Chronicles the life of Queen Elizabeth II from the 1940s to modern times.', '2016-11-04', 'hello@hello.com'),
('The Boys', 3, 8, 'Action', 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.', FALSE, FALSE, '2024-09-01 12:00:00', '252627', 'https://example.com/the_boys.jpg', 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.', '2019-07-26', 'hello@hello.com'),
('Black Mirror', 5, 3, 'Science Fiction', 'An anthology series exploring a twisted, high-tech multiverse where humanitys greatest innovations and darkest instincts collide.', FALSE, FALSE, '2024-10-01 12:00:00', '282930', 'https://example.com/black_mirror.jpg', 'An anthology series exploring a twisted, high-tech multiverse where humanitys greatest innovations and darkest instincts collide.', '2011-12-04', 'hello@hello.com');
