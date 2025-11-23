-- SQL migration
CREATE TABLE
    IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        auth0_id VARCHAR NOT NULL UNIQUE,
        email VARCHAR NOT NULL,
        nickname VARCHAR,
        created_at TIMESTAMP DEFAULT NOW ()
    );