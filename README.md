# Task Manager App (MERN Stack)

A task manager application built using **MongoDB, Express, React, and Node.js (MERN stack)**.  
Users can register, log in, create tasks, edit tasks, and delete tasks.  

---

## 🚀 Features
- User authentication (Register,login & logout)
- Create, edit, delete tasks
- Popup modal for task creation & editing
- Sticky navbar with user info and logout option
- Scrollable task list for better UI
- Responsive design using Tailwind CSS

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Others:** JWT authentication, Axios, React Hot Toast

---

## ⚡ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/musthafa1991/task-manager.git
cd task-manager
2. Install dependencies
For frontend:

cd client
npm install

For backend:

cd server
npm install

3. Setup environment variables
Create a .env file in the server folder.

Add the following (update values accordingly):
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret
NODE_ENV=development
CLIENT_ENDPOINT=http://localhost:3000

Create a .env file in the client folder.
Add the following (update values accordingly):
VITE_BACKEND_URL=http://localhost:5000

4. Run the application
Start backend server:
cd server
npm run dev

Start frontend client:
cd client
npm run dev

Frontend will run on http://localhost:3000
Backend will run on http://localhost:5000
