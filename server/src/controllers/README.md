# controllers/

Contain Express route handlers (controllers).

Each controller:

- receives `req`, `res`
- optionally validates input
- calls logic from `models/` or `services/`
- sends back a response (JSON or error)

❌ Should not talk directly to the database.

# controllers/reviewController

## Examples

- `handlePostMessage()` — main function of the application to generate the review by calling post method
- `handleGetUserReviews()` — to see all the reviews related to the user that is logged in - `(sub)`

# controllers/userController

- `syncUserWithDatabase()` — main function of handling of storing data when user is logged in / signed up
- `handleGetUser()` - function to get the data from DB to output in frontend
