DROP TABLE IF EXISTS mh_crisis_lines;

CREATE TABLE mh_crisis_lines(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    county TEXT NOT NULL,
    info TEXT NOT NULL
);