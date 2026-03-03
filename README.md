# Home Bites 🍽️

Home Bites is a digital catalog platform designed to support home-based family businesses by allowing them to showcase their homemade food online. Customers can browse available dishes, filter by category, and easily place orders directly with the family via WhatsApp.

This project was built to achieve the **"Best Outcome"** criteria, featuring a robust full-stack architecture with an Express.js backend, a responsive React.js SPA, and a scalable SQLite database. 

## Features
- **Modern UI/UX**: Designed with a vibrant, glassmorphism aesthetic using Tailwind CSS.
- **Dynamic Catalog**: Browse and search through dishes with real-time filtering.
- **WhatsApp Integration**: Deep linking generates a pre-filled WhatsApp message containing the dish name and price.
- **Family Profiles**: Dedicated pages for home businesses containing their bio, contact details, and full menu.
- **SQLite Database**: Lightweight and fast local database setup.

## Architecture Decisions
The application uses a **Monorepo Structure** for simplicity.
*   **Frontend**: Built with **React** + **Vite**. State is managed via React Hooks. Routing handled by `react-router-dom`. Styling via `tailwindcss` (v3). 
*   **Backend**: A lightweight **Express.js** API providing RESTful endpoints.
*   **Database**: **SQLite** (`sqlite3`). No complex setup is required; it's self-contained and persistent.

## Prerequisites
*   Node.js (v18+ recommended)
*   npm

## Getting Started

Follow these instructions to run the project locally. 

### 1. Installation

Install all backend and frontend dependencies directly from the root folder:

```bash
npm install
cd backend
npm install
cd ../frontend
npm install
```

### 2. Running the Application

The project uses `concurrently` to run both the frontend and backend servers with a single command. 

From the **root directory** (`d:\projects\Home Bites`), run:

```bash
npm run dev
```

This will start:
*   **Backend API**: `http://localhost:5000`
*   **Frontend SPA**: `http://localhost:5173`

### 3. Usage & Seeding Data
1. Open your browser and navigate to `http://localhost:5173`.
2. Upon first launch, the database will be empty. Scroll down and click the **"Seed Dummy Data"** button. The page will refresh and the dishes will populate from the local SQLite database exactly as expected!
3. Click any "Order via WhatsApp" button to see the dynamic URL generation in action.
