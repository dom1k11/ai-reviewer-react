-- SQL migration
CREATE TABLE
    IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        repo_id INTEGER NOT NULL,
        score INTEGER CHECK (
            score >= 0
            AND score <= 100
        ),
        created_at TIMESTAMP DEFAULT NOW ()
    );