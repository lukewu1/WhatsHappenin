DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS profiles;
CREATE TABLE profiles (
    user_id INT NOT NULL UNIQUE,
    profile_picture VARCHAR(50),
    profile_description TEXT,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50) NOT NULL,
    comment VARCHAR(200) NOT NULL
);

DROP TABLE IF EXISTS users_to_comments;
CREATE TABLE users_to_comments (
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments (comment_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    a_date VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    thumbnail VARCHAR(500),
    link VARCHAR(500) NOT NULL
);

DROP TABLE IF EXISTS articles_to_comments;
CREATE TABLE articles_to_comments (
    article_id INT NOT NULL,
    comment_id INT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles (article_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments (comment_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS articles_to_users;
CREATE TABLE articles_to_users (
    article_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles (article_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);