# AI Assistant — Dify API Website

A React + Vite website with a Node/Express backend that connects to a Dify conversational application through the Dify API.

## Requirements
- Node.js 18+ (Node 20+ recommended)
- A Dify application and API key

## Setup

### 1. Backend
Open a terminal:

```powershell
cd backend
npm install
copy .env.example .env
```

Edit `backend/.env` and set:

```env
DIFY_API_KEY=YOUR_DIFY_API_KEY
DIFY_API_URL=https://api.dify.ai/v1
```

Start backend:

```powershell
npm start
```

It runs on `http://localhost:5000`.

### 2. Frontend
Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Important
- Never put your Dify API key in the frontend.
- Never commit `backend/.env` to GitHub.
- The backend uses the Dify `/chat-messages` endpoint, so the Dify application should support conversational chat.
