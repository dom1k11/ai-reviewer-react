INSERT INTO reviews (user_id, repo_id, score)
VALUES
  ((SELECT id FROM users WHERE auth0_id = 'auth0|test-user-7'), 1, 85),
  ((SELECT id FROM users WHERE auth0_id = 'auth0|test-user-8'), 1, 92),
  ((SELECT id FROM users WHERE auth0_id = 'auth0|test-user-9'), 2, 70),
  ((SELECT id FROM users WHERE auth0_id = 'auth0|test-user-7'), 2, 60)
ON CONFLICT DO NOTHING;
