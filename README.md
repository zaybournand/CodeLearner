Learn2Code 🚀

Learn2Code is a full-stack skill management system designed to help developers track their technical competencies and growth. Built using modern enterprise standards, it implements a secure REST API with a responsive React frontend.

🛠 Tech Stack

Backend: Java 17+, Spring Boot 3, Spring Security (JWT), Spring Data JPA

Frontend: React (Vite), Tailwind CSS

Database: H2 (In-memory for dev) / MySQL (Production)

Architecture: Controller-Service-Repository (Layered)

⚡️ Quick Start

1. Backend (Spring Boot)

The backend runs on port 8080.

cd backend
./mvnw spring-boot:run

Key Configuration:

Server Port: 8080

Base API Path: /api/v1 (e.g., http://localhost:8080/api/v1/skills)

Security: JWT Authentication architecture is in place.

Current Dev Mode: Endpoints under /api/v1/auth/** and /api/v1/skills/** are set to permitAll() for testing.

2. Frontend (React)

The frontend runs on port 5173 (Vite default) or 3000.

cd frontend
npm install
npm run dev

Important: Ensure your API_URL in App.jsx points to http://localhost:8080/api/v1/skills.

🔌 API Endpoints

Method

Endpoint

Description

Access

GET

/api/v1/skills

List all skills

Public (Dev)

POST

/api/v1/skills

Create a new skill

Public (Dev)

GET

/api/v1/skills/{id}

Get skill details

Public (Dev)

DELETE

/api/v1/skills/{id}

Remove a skill

Public (Dev)

POST

/api/v1/auth/signup

Register new user

Public

POST

/api/v1/auth/login

Login & Get Token

Public

🚧 Current Status & TODOs

[x] Basic CRUD for Skills

[x] Database Entity & Relationships

[x] Security Configuration (CORS & CSRF disabled)

[ ] Finalize JWT Token generation logic

[ ] Connect "Sign Up" form to Backend

[ ] Add User <-> Skill relationship (Many-to-Many)

🐛 Troubleshooting

Getting a 403 Forbidden Error?

Check your URL: It must start with /api/v1/....

Check the Controller: Ensure your Controller class has @RequestMapping("/api/v1/...").

Check Security Config: Ensure SecurityConfig.java allows that specific matcher.

Check JWT Filter: Ensure the filter chain continues (filterChain.doFilter) even if no token is present, allowing the permitAll configuration to take effect.
