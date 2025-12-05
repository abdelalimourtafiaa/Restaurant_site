# Le Gourmet Royal - Restaurant Website

## Project Structure
- **backend/**: Node.js + Express API + MongoDB
- **frontend/**: React + Vite + Vanilla CSS (Luxury Theme)

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017

## Setup & Run

### 1. Backend
Open a terminal:
```bash
cd backend
npm install
# Seed the database (optional, creates admin and sample dishes)
node seed.js
# Start the server
npm run dev
```
Server runs on `http://localhost:5000`.

### 2. Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (or similar).

## Admin Access
- **URL**: `/admin/login` (e.g., http://localhost:5173/admin/login)
- **Email**: `admin@legourmet.com`
- **Password**: `admin123`

## Features
- **Public Site**: Home, Menu, Reviews, Reservation.
- **Admin Panel**: Dashboard, Manage Dishes (CRUD), Manage Reviews, Manage Reservations.
