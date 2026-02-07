-- Desafío Soft Jobs
CREATE DATABASE softjobs;
\c softjobs;

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  rol VARCHAR(25),
  lenguage VARCHAR(20)
);

SELECT * FROM usuarios;
