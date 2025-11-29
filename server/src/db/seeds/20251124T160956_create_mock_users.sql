-- SQL seed
INSERT INTO
  users (name, email, password_hash, role)
VALUES
  (
    'Admin',
    'admin@gmail.com',
    '$2b$10$DLCspxtuCvWZKJ36KecpJeKJHFu0JBbOtKB2KlpofiK/EmnxkY5v6',
    'admin'
  ),
  (
    'John Doe',
    'john@example.com',
    '$2b$10$DLCspxtuCvWZKJ36KecpJeKJHFu0JBbOtKB2KlpofiK/EmnxkY5v6',
    'user'
  ),
  (
    'Jane Smith',
    'jane@example.com',
    '$2b$10$DLCspxtuCvWZKJ36KecpJeKJHFu0JBbOtKB2KlpofiK/EmnxkY5v6',
    'user'
  );
