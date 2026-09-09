# Agentic AI for Smart Event Management Operations

MongoDB version — no MySQL/XAMPP and no external APIs.

## Architecture
Frontend (HTML/CSS/Vanilla JS)
→ Node.js + Express backend
→ MongoDB

The "AI agents" are implemented as local decision engines:
- Registration Agent: duplicate/fake-registration risk, capacity and attendee insights.
- Venue Agent: venue matching, availability and conflict detection.
- Speaker Agent: expertise/availability matching and scheduling conflicts.

## Requirements
- Node.js 18+
- MongoDB Community Server running locally
- MongoDB Compass is optional

## Setup

### 1. Install/start MongoDB
Install MongoDB Community Server and make sure the MongoDB service is running.

Optional Compass connection:
`mongodb://127.0.0.1:27017`

### 2. Configure backend
Open a terminal in `backend`:

```bash
npm install
```

Copy `.env.example` to `.env` and keep:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/agentic_event_management
```

### 3. Seed demo data

```bash
npm run seed
```

This creates:
- demo admin
- demo participant
- events
- venues
- speakers
- sessions

### 4. Start backend

```bash
npm run dev
```

Backend: `http://localhost:5000`

### 5. Open frontend
Open `frontend/index.html` in a browser, or serve the frontend with a simple static server.

The frontend API URL is configured in `frontend/js/config.js`.

## Demo login
Admin:
- Email: `admin@eventai.local`
- Password: `Admin@123`

Participant:
- Email: `participant@eventai.local`
- Password: `Participant@123`

## Important
This project intentionally does not call OpenAI, email, payment, maps, or other external APIs.

Email confirmation/reminders are stored as local EmailLog documents so the workflow can be demonstrated without an external email provider. A real SMTP provider can be connected later if required.
