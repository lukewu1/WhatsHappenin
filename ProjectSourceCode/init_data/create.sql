DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50),
    comment VARCHAR(200)
);

DROP TABLE IF EXISTS users_to_comments;
CREATE TABLE users_to_comments (
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments (comment_id) ON DELETE CASCADE
);