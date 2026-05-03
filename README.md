# ⚖️ AI-Driven Legal Research Engine for Commercial Courts

> A MERN stack web application that helps judges of Indian commercial courts conduct legal research faster using AI. Judges upload a case PDF and instantly receive a complete legal research report — case summary, relevant laws, matching precedents, and outcome prediction.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Seeding the Database](#seeding-the-database)
- [API Endpoints](#api-endpoints)
- [Ethical Considerations](#ethical-considerations)
- [Deployment](#deployment)
- [License](#license)

---

## 📖 About the Project

The **Commercial Courts Act, 2015** was enacted to resolve commercial disputes faster in India. However, case pendency remains a major challenge. Judges spend significant time on manual legal research, which slows down dispute resolution.

This project addresses the issue by building an **AI-powered legal research assistant** exclusively for commercial courts. Instead of manually searching for laws and past cases, a judge uploads their current case PDF and the system automatically generates a complete legal research report using **Google Gemini AI**.

> This project was built as part of the Government of India's initiative to leverage technology for expediting commercial dispute resolution.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 PDF Upload | Judge uploads the current case PDF |
| 🤖 AI Analysis | Gemini AI reads the case and extracts summary, legal issues, case type, and keywords |
| ⚖️ Legal Provisions | Matches relevant Indian law sections from MongoDB |
| 📚 Precedents | Finds top 3 matching historical court judgments |
| 📊 Outcome Prediction | Shows plaintiff vs defendant win statistics with disclaimer |
| 🔐 Authentication | Secure login with JWT and bcrypt |
| 📋 Search History | Every analysis is logged and accessible |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (Free M0 tier) |
| AI / NLP | Google Gemini 1.5 Flash API (Free tier) |
| PDF Processing | multer + pdf-parse |
| Authentication | bcryptjs + JSON Web Tokens |
| Case Laws | Stored manually in MongoDB |
| Frontend Deploy | Vercel (Free) |
| Backend Deploy | Render (Free) |
| **Total Cost** | **₹0** |

---

## 📁 Project Structure

```
legal-research-engine/
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Register and login logic
│   │   ├── caseController.js       # PDF upload, Gemini call, Promise.all
│   │   └── historyController.js    # Fetch judge's search history
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── uploadMiddleware.js     # multer PDF only config
│   ├── models/
│   │   ├── User.js                 # Judge account schema
│   │   ├── CaseDocument.js         # Uploaded PDF info
│   │   ├── AIAnalysis.js           # Gemini output
│   │   ├── LegalProvision.js       # Indian law sections
│   │   ├── Precedent.js            # Historical court cases
│   │   ├── OutcomeStat.js          # Prediction statistics
│   │   └── SearchHistory.js        # Past searches
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── caseRoutes.js
│   │   └── historyRoutes.js
│   ├── seed/
│   │   ├── statutes.json           # 30-40 Indian law sections
│   │   ├── cases.json              # 10-15 landmark court cases
│   │   ├── outcomeStats.json       # Dummy prediction data
│   │   └── seedDB.js               # Run once to populate MongoDB
│   ├── uploads/                    # Temporary PDF storage
│   ├── utils/
│   │   ├── gemini.js               # Gemini API call + prompt
│   │   └── searchCases.js          # MongoDB keyword search
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js                   # Express entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── UploadBox.jsx
        │   ├── ResultCard.jsx
        │   ├── PrecedentCard.jsx
        │   ├── PredictionChart.jsx
        │   └── HistoryTable.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   └── History.jsx
        ├── context/
        │   └── AuthContext.jsx     # Global auth state
        ├── utils/
        │   └── api.js              # Axios base config
        ├── App.jsx
        └── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or above
- npm v9 or above
- MongoDB Atlas account (free)
- Google AI Studio account (free) for Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/legal-research-engine.git
cd legal-research-engine
```

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

See [Environment Variables](#environment-variables) section below.

### 5. Seed the database

```bash
cd backend
npm run seed
```

### 6. Run the application

Backend (in `/backend` folder):
```bash
npm run dev
```

Frontend (in `/frontend` folder):
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:5000`

---

## 🔐 Environment Variables

Create a `.env` file inside the `/backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

Create a `.env` file inside the `/frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

### How to get each key

| Key | Where to get |
|---|---|
| `MONGO_URI` | MongoDB Atlas → Connect → Drivers → copy connection string |
| `JWT_SECRET` | Any random long string e.g. `mysecretkey123456789` |
| `GEMINI_API_KEY` | aistudio.google.com → Get API key → Create API key |

---

## 🌱 Seeding the Database

Before running the app for the first time, seed the database with law sections and case data:

```bash
cd backend
npm run seed
```

This populates three collections:

- **legalprovisions** — 30-40 sections from Indian Contract Act, Commercial Courts Act, CPC, Arbitration Act, and Specific Relief Act. Source: indiacode.nic.in
- **precedents** — 10-15 landmark Supreme Court and High Court judgments stored with keywords for search
- **outcomestats** — Historical outcome percentages per case type per court for the prediction chart

> Run this only once. Never run again unless you want to reset the data.

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new judge | No |
| POST | `/api/auth/login` | Login and get JWT token | No |

### Case Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/case/upload` | Upload PDF and get AI analysis | Yes |

### History Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/history` | Get all past searches for logged-in judge | Yes |

---

## ⚖️ Ethical Considerations

This system is designed to act as a **facilitator, not a decision-maker**.

- The outcome prediction feature is clearly labeled: *"This is statistical guidance only and not a legal recommendation."*
- All results include their source so judges can independently verify
- The system presents information neutrally without suggesting a preferred outcome
- Final judicial decisions always remain with the judge

> AI assists. The judge decides.

---

## 🚀 Deployment

### Frontend — Vercel

1. Push your code to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Set Root Directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-render-backend-url.onrender.com`
5. Deploy

### Backend — Render

1. Go to render.com → New Web Service → Connect your repo
2. Set Root Directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from your `.env` file
6. Deploy

> Note: Render free tier sleeps after 15 minutes of inactivity. Open the app 1 minute before a demo so the server wakes up.

---

## 📦 NPM Packages Used

### Backend
```
express, mongoose, dotenv, bcryptjs, jsonwebtoken,
multer, pdf-parse, axios, cors, nodemon
```

### Frontend
```
react, react-router-dom, axios, tailwindcss
```

---

## 👨‍💻 Built By

Built as a **minor project** for Shri Vaishnav Institute of Information Technology as part of a Government of India commercial courts technology initiative.

---

## 📄 License

This project is built for educational purposes as a student minor project.

---

> *"Justice delayed is justice denied. Technology is the bridge."*
