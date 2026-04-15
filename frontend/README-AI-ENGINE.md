# AI Research Engine - Frontend

A modern React + Vite frontend for analyzing legal documents and cases using AI.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file (copy from example):
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🛠 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── context/          # React Context (AuthContext)
├── utils/            # Utility functions and API client
├── assets/           # Static assets
├── App.jsx           # Main App component
├── main.jsx          # Entry point
├── App.css           # App styles
└── index.css         # Global styles
```

## 🔐 Environment Variables

See `.env.example` for required environment variables:
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:5000)

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Custom color theme configured in `tailwind.config.js`
- PostCSS with autoprefixer for vendor prefixing

## 📋 Code Quality

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Prettier Plugin for Tailwind** - Automatic class sorting

## 🚢 Production Build

```bash
npm run build      # Creates optimized build in dist/
npm run preview    # Preview production build locally
```

## 📝 Features

- Authentication with JWT tokens
- Protected routes
- PDF document upload and analysis
- Legal case research
- Outcome predictions
- Search history tracking
- Multi-language support
