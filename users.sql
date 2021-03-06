DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS skills;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(50) NOT NULL,
    last VARCHAR(50) NOT NULL,
    email VARCHAR(200) UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    careerpath VARCHAR(100),
    image TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES users(id),
    offer VARCHAR(1000)
);

CREATE TABLE favorites(
	id SERIAL PRIMARY KEY,
	sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses(
	id SERIAL PRIMARY KEY,
	student_id INT REFERENCES users(id),
    image_id VARCHAR(100) NOT NULL,
    title VARCHAR(1000) NOT NULL,
    image VARCHAR(1000),
    url VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--
CREATE TABLE private (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    receiver_id INT NOT NULL REFERENCES users(id),
    message VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
