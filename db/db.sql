CREATE DATABASE migOgMonopolet;

USE migOgMonopolet;

CREATE TABLE dilemmas (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(5000),
    answer1 VARCHAR(250) DEFAULT '',
    answer2 VARCHAR(250) DEFAULT '',
    answer3 VARCHAR(250) DEFAULT '',
    answer4 VARCHAR(250) DEFAULT '',
    answer1count INT DEFAULT 0,
    answer2count INT DEFAULT 0,
    answer3count INT DEFAULT 0,
    answer4count INT DEFAULT 0,
    createdAt DATETIME
);



