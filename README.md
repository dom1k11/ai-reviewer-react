# 🧠 AI Reviewer Assistant

AI Reviewer Assistant automatically generates structured code reviews for GitHub repositories using OpenAI.
## Live Demo
- https://ai-reviewer-client.onrender.com/

## Project Overview

The application allows authenticated users to:
- submit a public GitHub repository URL
- select review criteria
- generate an AI-based code review
- view the review result and score
- store and retrieve past reviews


## 🐳 Running the Project with Docker

This is the recommended way to run the project locally.

### Prerequisites

- Docker
- Docker Compose

### 1. Clone the repository


`git clone https://github.com/TuringCollegeSubmissions/dsedus-WD2.3.4.5`


### 2. Environment setup

Before running the project, create a `.env` file based on `.env.example`.

### 3. Start the application

```bash
docker compose up --build
```

After starting the containers, run database migrations and seed data:

```
npm run migrate
npm run seed
```

This will start:
* PostgreSQL database
* Backend API (Express)
* Frontend application (React)

## 🧪 Tests

Coverage reports can be generated with:

  ```bash
  npm run test:coverage
  ```
## 🧪 End-to-End Testing (Playwright)

```bash
npx playwright test
```
