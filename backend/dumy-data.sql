-- societies
INSERT INTO societies (id, id_card_number, password, name, gender, address, regional_id, login_token)
VALUES
(null, '12345678', '123456', 'Budi', 'male', 'Jl. A', 1, 'abcdef'),
(null, '87654321', '654321', 'Ani', 'female', 'Jl. B', 2, 'ghijkl'),
(null, '56781234', '789012', 'Rudi', 'male', 'Jl. C', 3, 'mnopqr'),
(null, '43218765', '210987', 'Sari', 'female', 'Jl. D', 4, 'stuvwx');


-- regionals
INSERT INTO regionals (id, province, district)
VALUES
(null, 'Jawa Timur', 'Malang'),
(null, 'Jawa Barat', 'Bandung'),
(null, 'Bali', 'Denpasar'),
(null, 'Sumatera Utara', 'Medan');

-- validations
INSERT INTO validations (job_category_id, society_id, validator_id, status, wrok_experience, job_position, reason_accepted, validator_notes)
VALUES
( 1, 1, 2, 'accepted', '3 years as a web developer', 'Web Developer', 'Good skills and portfolio', 'Nice work'),
( 2, 2, 3, 'declined', '1 year as a graphic designer', 'Graphic Designer', 'Lack of experience and creativity', 'Need more improvement'),
( 3, 3, 4, 'pending', '2 years as a data analyst', 'Data Analyst', NULL, 'Waiting for confirmation'),
( 4, 4, 1, 'accepted', '4 years as a software engineer', 'Software Engineer', 'Excellent knowledge and performance', 'Impressive');

-- users
INSERT INTO users (username, password) 
VALUES 
('Budi', '123456'),
('Ani', '654321'),
('Rudi', '789012'),
('Sari', '210987');

-- validators
INSERT INTO validators (user_id, role, name) 
VALUES 
(1, 'officer', 'Budi'), 
(2, 'validator', 'ani'), 
(3, 'officer', 'Rudi'), 
(4, 'validator', 'Sari');

-- job vacancie
INSERT INTO job_vacancies (job_catogory_id, company, address, description) VALUES
(1, 'Tech Solutions Co.', '123 Main St, Cityville', 'Looking for a skilled software engineer.'),
(2, 'Marketing Hub Inc.', '456 Oak Ave, Townburg', 'Hiring a creative marketing specialist.'),
(3, 'Finance Wizards Ltd.', '789 Pine Blvd, Financial City', 'Position available for a financial analyst.');

-- job apply societies
INSERT INTO job_apply_societies (note, date, society_id, job_vacancy_id) VALUES
('Impressive resume', '2023-11-22 09:00:00', 1, 1),
('Enthusiastic candidate', '2023-11-23 10:30:00', 2, 2),
('Experienced applicant', '2023-11-24 14:15:00', 3, 3);

-- job apply position
INSERT INTO job_apply_position (date, society_id, job_vacancy_id, position_id, job_apply_societies_id, status) VALUES
('2023-11-25 11:45:00', 1, 1, 1, 1, 'accepted'),
('2023-11-26 13:30:00', 2, 2, 2, 2, 'pending'),
('2023-11-27 15:20:00', 3, 3, 3, 3, 'rejected');

-- avaliable position
INSERT INTO avaliable_positions (job_vacancy_id, position, capacity, apply_capacity) VALUES
(1, 'Software Engineer', 5, 2),
(1, 'UI/UX Designer', 3, 1),
(2, 'Marketing Specialist', 4, 2),
(2, 'Content Writer', 2, 1),
(3, 'Financial Analyst', 6, 3),
(3, 'Accountant', 3, 2),
(1, 'Data Analyst', 4, 1),
(2, 'Sales Representative', 5, 3);
