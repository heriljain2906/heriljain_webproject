# Smart Public Grievance Redressal System

A production-grade full-stack web application built to allow citizens to register and securely log in, aiming to submit grievances with AI-powered NLP processing.

## 🚀 Project Architecture

- **Frontend**: Next.js (React) + Vanilla CSS (Port 3000)
- **Backend Microservice / API**: Node.js + Express + Prisma ORM (Port 3001)
- **Database**: SQLite (Configured to easily migrate to PostgreSQL for production)

## 🛠 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** (Node Package Manager)

## 📦 Installation & Setup

If you are running the project for the first time, you need to install the dependencies in both folders.

1. **Backend Setup**
   The backend provides the API and connects to the database.
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma db push
   ```

2. **Frontend Setup**
   The frontend serves the Next.js React client.
   ```bash
   cd frontend
   npm install
   ```

## ⚡ How to Run the Project Locally

You will need to open **two separate terminal windows** (or Command Prompts) to run both servers concurrently.

### 1. Start the Backend Server
Open your first terminal and run:
```bash
cd backend
npm run dev
```
> The backend will start on **http://localhost:3001** via Nodemon.

### 2. Start the Frontend Server
Open your second terminal and run:
```bash
cd frontend
npm run dev
```
> The frontend will start on **http://localhost:3000**.

## 🌐 Testing the Application

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2. You will see the beautiful, dynamic landing page for the Grievance System.
3. Click **Register Now** to create an account.
4. Input a dummy name, phone number (e.g., `1234567890`), and a password.
5. Watch as the form securely communicates with the backend API (`/api/auth/register`), generates a JWT auth token securely, and authenticates you into the **Citizen Dashboard**!
6. Use the **Citizen Login** to test logging back in with those credentials.

## 🏗 What's Currently Built (Phases 1 & 2)

- Complete database schemas mapped locally to SQLite.
- Monolithic microservice boilerplate.
- Express JS routing with robust Authentication Controllers and JWT logic.
- Aesthetically driven Next.js client with `use client` state management.
- Dynamic layout design with animated vanilla CSS gradients.

## 🔮 What's Next? (Pending Phases)

- **AI Grievance Form**: Integration with OpenAI API to automatically parse, classify, and priority-tag submitted problems based on semantic patterns.
- **Geospatial Hotspots**: Mapping systems to geographically visualize the occurrences of problems like Potholes and Garbage issues.
- **Admin Dashboards**: Role-based viewing metrics for municipal workers to track SLA deadlines and escalating claims.
