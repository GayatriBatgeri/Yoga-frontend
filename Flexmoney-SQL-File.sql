-- Creation Participants Table
CREATE TABLE participants (
  participant_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(10) NOT NULL,
  batch VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creation Payments Table
CREATE TABLE payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  participant_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (participant_id) REFERENCES participants(participant_id)
);
