INSERT INTO
    comments (username, comment)
VALUES
    (
        'a',
        'What an amazing article I really enjoyed listening to it'
    ),
    ('a', 'amazing'),
    ('a', 'i agree'),
    ('a', 'yes'),
    ('a', 'please');

INSERT INTO
    articles (title, a_date, author, link)
VALUES
    (
        'Breaking News: AI Advances',
        '2024-11-01',
        'John Smith',
        'google.com'
    ),
    (
        'Tech Trends 2024', 
        '2024-11-02', 
        'Jane Doe',
        'google.com'
    ),
    (
        'Economic Insights',
        '2024-10-30',
        'Alex Johnson',
        'google.com'
    ),
    (
        'Health Innovations',
        '2024-11-03',
        'Emily Brown',
        'google.com'
    ),
    (
        'Space Exploration Update',
        '2024-10-25',
        'Michael White',
        'google.com'
    );

INSERT INTO
    articles_to_comments (article_id, comment_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5);
