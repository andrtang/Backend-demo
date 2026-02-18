# Backend Demo App

Simple full-stack demo using:

- React frontend  
- Express backend  
- MongoDB  
- Mongoose  

This project demonstrates a basic task manager where tasks are stored in MongoDB and accessed through a REST API.

---

## 🧰 Requirements

Install these first:

- Node.js (https://nodejs.org)
- MongoDB Community Server

Make sure MongoDB is installed and available from the terminal.

---

## 🚀 Quick Setup

Clone the repository:

```bash
git clone https://github.com/andrtang/backend-demo.git
cd backend-demo
```

Install everything (root + backend + frontend):
```bash
npm run setup
```

This will:
- Install all npm dependencies
- Create the MongoDB data folder at C:\mongodb-data (Windows)

## Start MongoDB

Start MongoDB locally in a terminal:

```bash
mongod --dbpath C:\mongodb-data
```

Leave this terminal running.
If MongoDB was installed as a Windows service, it may already be running.

## Run the App

In a new terminal, from the project root:

```bash
npm run dev
```

This starts both: 
- Backend API -> http://localhost:5001
- Frontend -> http://localhost:3000
The React app should open automatically in your browser.

## Test the Backend API

Add tasks to the frontend. 
You can verify the backend is working using curl:

```bash
curl.exe http://localhost:5001/api/tasks
```

