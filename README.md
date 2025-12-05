

# Instant AQI — A MERN Stack Application

Short overview
- Instant AQI is a MERN (MongoDB, Express, React, Node) stack web application scaffolded with Vite for the client.
- The client uses React + Tailwind CSS (v4) and is configured for JavaScript (not TypeScript).
- The server is a Node/Express backend exposing REST endpoints and connecting to MongoDB.

This file explains project purpose, structure, setup, common commands, and troubleshooting tips (including notes for using shadcn/ui in a JS project).

---

## Table of contents
- Project overview
- Tech stack
- Folder structure
- Prerequisites
- Environment variables
- Setup & run (client & server)
- Build & deploy
- shadcn/ui (JS) installation notes
- Troubleshooting
- Contributing

---

## Project overview
InstantAQI provides a full-stack scaffold with:
- React client (Vite) using Tailwind CSS
- Express server with MongoDB integration
- Authentication, profile, and dashboard pages (components and pages already present)
- UI components can be extended using shadcn/ui (Radix + Tailwind based components)

---

## Tech stack
- Frontend: React (Vite), Tailwind CSS, shadcn/ui-compatible components
- Backend: Node.js, Express
- Database: MongoDB (Atlas or local)
- Dev tools: npm, Vite, nodemon (typical), eslint, tailwind

---

## Repository structure (important folders)
- client/ — Vite React app (JS)
  - src/
    - components/ — UI components (AirQuality, Sidebar, TopBar, etc.)
    - pages/ — Login, Register, Dashboard, nested dashboard pages
    - context/ — React context
    - main.jsx, App.jsx, index.css
  - vite.config.js — contains alias config (`'@' -> ./src`)
  - package.json, tailwind.config.js
- server/ — Express backend (check this folder for your server entry, routes, models)
  - (Typical files) server.js / index.js, routes/, controllers/, models/, config/
  - package.json

---

## Prerequisites
- Node.js (v18+ recommended)
- npm (or pnpm/yarn)
- MongoDB connection (Atlas URI or local)
- Git (optional)

---

## Environment variables
Create .env files in both folders as needed.

Client (example: client/.env)
- VITE_API_URL=http://localhost:5000/api

Server (example: server/.env)
- PORT=5000
- MONGO_URI=<your-mongodb-connection-string>
- JWT_SECRET=<your-secret-for-tokens>
- NODE_ENV=development

Do NOT commit secrets to git.

---

## Building & deployment
- Client build:
  PS> cd client
  PS> npm run build
  - Output: client/dist

- Server deployment:
  - Use your usual Node hosting (Heroku, Render, DigitalOcean, Railway, etc.) or a Docker container.
  - Ensure environment variables are set in your host and a production MongoDB is used.

- Vercel/Netlify: deploy client dist or point Vercel to the client folder; configure server separately.

---

## shadcn/ui (install notes for JavaScript + Vite + Tailwind)
If you want to use shadcn/ui components in this JS project:

1) The CLI may complain about tsconfig.json import aliases — ignore for JS. The CLI only checks tsconfig by default.
2) Recommended manual install (Windows / PowerShell):

   PS> cd client
   PS> npm install shadcn-ui @radix-ui/react-slot class-variance-authority tailwind-merge lucide-react

3) Add a shadcn config file for the UI generator (prefer ESM):
   - Create `client/ui.config.mjs` (use .mjs to avoid CommonJS/ESM complaints):

   ````js
   // filepath: client/ui.config.mjs
   export default {
     $schema: "https://ui.shadcn.com/schema.json",
     style: "default",
     tailwind: {
       config: "tailwind.config.js",
       css: "src/index.css",
       baseColor: "zinc",
       cssVariables: true
     },
     aliases: {
       "@/components": "./src/components"
     }
   }