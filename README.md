# 📘 Workout Logger

Workout Logger is a full-stack web application that allows users to securely log and manage their workouts in one place.

This application was built as the CS195 Final Project and demonstrates a complete full-stack workflow, including frontend development with React, backend API design with Express, database integration with MongoDB, authentication, and deployment.

Users can create an account, log in, and record their workouts. All data is private to each user and persists across sessions. The core problem this app solves is providing a simple, organized, and secure way for users to track workouts without relying on notes apps or spreadsheets.

---

## 🌐 Live Demo

Frontend (Deployed Site):  
https://GarrettProv.github.io/Workout-Logger/

Backend (API Base URL):  
https://workout-logger-tnf8.onrender.com

Both links were tested in an incognito window before submission.

---

## ✨ Features

- User registration and login  
- Secure authentication using JSON Web Tokens (JWT)  
- Create, view, and delete workout entries  
- Backend REST API with CRUD functionality  
- Responsive React frontend using reusable components  
- Data persistence using MongoDB Atlas  
- Error handling on both the client and server  

---

## ⭐ Advanced Feature: Authentication

This project implements authentication as its advanced feature. Users must register and log in before accessing the application. Passwords are securely hashed before being stored in the database. After logging in, users receive a JWT that is required to access protected API routes, ensuring users can only view and manage their own workouts.

---

## 📸 Screenshots

The following screenshots are included in the repository under the `/screenshots` directory:

![Login Page](./screenshots/LoginPage.png)
![Workout Dashboard](./screenshots/SaveWorkout.png)
![Register Page](./screenshots/RegisterPage.png)

---

## 🏗️ Project Architecture

The project is organized into a frontend and backend structure as shown below:

/frontend  
&nbsp;&nbsp;/src  
&nbsp;&nbsp;&nbsp;&nbsp;/components  
&nbsp;&nbsp;&nbsp;&nbsp;/pages  
&nbsp;&nbsp;&nbsp;&nbsp;App.jsx  
&nbsp;&nbsp;&nbsp;&nbsp;main.jsx  

/backend  
&nbsp;&nbsp;/models  
&nbsp;&nbsp;/routes  
&nbsp;&nbsp;/middleware  
&nbsp;&nbsp;server.js  

The React frontend communicates with the Express backend through API routes. The backend uses Mongoose to interact with MongoDB, and environment variables are used to store sensitive information such as database credentials and JWT secrets.

---

## 📦 Installation & Setup

To run the project locally, first clone the repository:

git clone https://github.com/GarrettProv/Workout-Logger.git  
cd Workout-Logger  

Create environment variable files using the examples below.

Backend: 
MONGODB_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
PORT=3001  

Frontend:
VITE_API_URL=http://localhost:3001/api  

Install dependencies and start the backend:

cd backend  
npm install  
node server.js  

Install dependencies and start the frontend:

cd frontend  
npm install  
npm run dev  

The backend will run on http://localhost:3001 and the frontend will run on http://localhost:5173.

---

## 🛠 API Documentation

POST /api/auth/register  
Creates a new user account.

POST /api/auth/login  
Logs in a user and returns a JWT.

GET /api/workouts  
Returns all workouts for the authenticated user.

POST /api/workouts  
Creates a new workout.

DELETE /api/workouts/:id  
Deletes a workout by ID.

All workout routes require a valid JWT in the Authorization header.

---

## 🚀 Deployment Notes

The frontend is deployed using GitHub Pages and built using `npm run build`.  
The backend is deployed using Render, with environment variables configured through the Render dashboard.  
MongoDB Atlas is used for cloud database hosting.

---

## 🎥 Video Walkthrough

Video walkthrough link:  
https://drive.google.com/file/d/1759inmdLHmvpE11v7xHgnHDOPcNWMc40/view?usp=sharing

The video includes an overview of the app, a demonstration of core features, an explanation of authentication, and a discussion of a technical challenge encountered during development.

---

## 🧠 Reflection

The hardest part of this project was deployment and environment configuration. Debugging MongoDB connection issues, understanding how environment variables behave differently in production, and resolving CORS and authentication issues required careful troubleshooting.

I am most proud of successfully deploying a fully functional full-stack application with authentication and persistent data storage. Seeing the app work end-to-end in production was very rewarding.

If I were to do this project again, I would deploy earlier and plan the UI structure more thoroughly before writing code. This would help reduce debugging time later in the process.

Based on feedback from the 12/5 check-in gallery, I reduced the project scope and focused on stabilizing core features such as authentication, CRUD functionality, and deployment instead of adding additional features.

---

## 🤖 Acknowledgments / AI Usage Disclosure

AI tools (ChatGPT) were used to help troubleshoot deployment issues, debug MongoDB connection errors, clarify authentication logic, and assist with documentation wording. All generated code and suggestions were reviewed, understood, and implemented by me.
