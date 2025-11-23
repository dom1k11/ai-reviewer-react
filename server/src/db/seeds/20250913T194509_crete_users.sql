INSERT INTO users (auth0_id, email, nickname)
VALUES
  ('auth0|test-user-7', 'test1@example.com', 'testuser1'),
  ('auth0|test-user-8', 'test2@example.com', 'testuser2'),
  ('auth0|test-user-9', 'test3@example.com', 'testuser3')
ON CONFLICT (auth0_id) DO NOTHING;
