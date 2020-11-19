CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, -- becomes username?
    password VARCHAR(1000) NOT NULL,
    image VARCHAR(1000), -- assumes img url
    auth_level VARCHAR(255), -- future use, do we want a default?
    ayrshareApiKey VARCHAR(1000) -- what will this be?
);
CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    acronym VARCHAR(255),
    event_image VARCHAR(1000),
    type VARCHAR(128),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    website VARCHAR(512),
    registration_link VARCHAR(512),
    hashtag TEXT
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
    name VARCHAR,
    phase_id INTEGER REFERENCES phase,
    send_date DATE,
    send_time TIME,
    post_text TEXT,
    image VARCHAR(1000),
    response_id VARCHAR(1000) -- will be inserted after post to Linkedin
);
