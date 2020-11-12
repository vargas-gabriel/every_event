CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, -- becomes username?
    password VARCHAR(1000) NOT NULL,
    image BYTEA, -- assumes upload
    auth_level VARCHAR(255), -- future use, do we want a default?
    linkedin_account VARCHAR(512), -- what will this be?
    linkedin_oauth VARCHAR(1000) -- will be inserted after token received
);
CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    acronym VARCHAR(255),
    event_image BYTEA,
    type VARCHAR,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    website VARCHAR(512),
    registration_link VARCHAR(512),
    linkedin_account VARCHAR(512),
    hashtag TEXT,
    linkedin_oauth VARCHAR(1000) -- will be inserted after token received
);
CREATE TABLE user_event (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user", -- reserved keyword, s/b inside double quotes
    event_id INTEGER REFERENCES event
);
CREATE TABLE phase (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES event,
    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);
CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    phase_id INTEGER REFERENCES phase,
    send_date DATE NOT NULL,
    send_time TIME NOT NULL,
    post_text TEXT NOT NULL,
    image BYTEA,
    response_id VARCHAR(1000) -- will be inserted after post to Linkedin
);
