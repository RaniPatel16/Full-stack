# 📮 India Pincode Explorer — Full Stack Application

A modern, full-stack web application for exploring Indian postal (PIN) codes. Built with **React**, **Node.js/Express**, and **MongoDB**, it provides an interactive dashboard, search, and exploration interface for India's postal data.

---

## 🚀 Live Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Visual stats with charts — total pincodes, states, districts, delivery status distribution |
| **Explore** | Drill-down navigation: State → District → Taluk → Pincodes |
| **Search** | Instant search by pincode, office name, district, or state |
| **Pincode Detail** | Detailed view of any pincode — office name, type, delivery status, region, circle, division |
| **Export CSV** | Download filtered pincode data as CSV |
| **About** | Project overview and information page |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — UI library
- **Vite 8** — Build tool & dev server
- **React Router v7** — Client-side routing
- **Tailwind CSS v4** — Utility-first styling
- **Recharts** — Data visualization / charts
- **Axios** — HTTP client
- **Lucide React** — Icon library

### Backend
- **Node.js** — Runtime
- **Express 5** — Web framework
- **MongoDB + Mongoose 9** — Database & ODM
- **csv-parser** — CSV file parsing for data seeding
- **dotenv** — Environment variable management
- **CORS** — Cross-origin resource sharing
- **Multer** — File upload handling

---

## 📁 Project Structure

```
Full-stack/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection config
│   │   ├── controllers/
│   │   │   └── pincode.controller.js  # Business logic & handlers
│   │   ├── models/
│   │   │   └── pincode.model.js    # Mongoose schema
│   │   ├── routes/
│   │   │   └── pincode.routes.js   # API route definitions
│   │   ├── app.js                  # Express app setup
│   │   └── index.js                # Server entry point + auto-seed
│   ├── seed.js                     # Manual seed script
│   ├── package.json
│   └── .env                        # Environment variables (not in repo)
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Stats & charts page
│   │   │   ├── Explore.jsx         # State/District/Taluk explorer
│   │   │   ├── PincodeDetail.jsx   # Single pincode detail view
│   │   │   └── About.jsx           # About page
│   │   ├── App.jsx                 # Main app with routing
│   │   ├── App.css                 # App styles
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── pincodes_all.csv                # Source CSV data file
└── README.md
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/states` | Get all states |
| `GET` | `/api/states/:state/districts` | Get districts for a state |
| `GET` | `/api/states/:state/districts/:district/taluks` | Get taluks for a district |
| `GET` | `/api/pincodes` | Get pincodes (with filters) |
| `GET` | `/api/search?q=<query>` | Search pincodes by keyword |
| `GET` | `/api/pincode/:pincode` | Get details for a specific pincode |
| `GET` | `/api/stats` | Dashboard summary stats |
| `GET` | `/api/stats/state-distribution` | Pincode count per state |
| `GET` | `/api/stats/delivery-distribution` | Delivery vs non-delivery breakdown |
| `GET` | `/api/export` | Export data as CSV |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local instance or MongoDB Atlas)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/RaniPatel16/assignment1.git
cd assignment1
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/pincode_db
```

> Replace with your MongoDB Atlas URI if using cloud database.

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

### 4. Run the Application

**Start Backend** (from `backend/` directory):
```bash
npm start
```
> The server runs on `http://localhost:5000` and auto-seeds the database from `pincodes_all.csv` if empty.

**Start Frontend** (from `frontend/` directory):
```bash
npm run dev
```
> The frontend runs on `http://localhost:5173`

---

## 🗄️ Database

- **Database:** MongoDB
- **Auto-Seed:** On first startup, the backend automatically reads `pincodes_all.csv` and imports all records into MongoDB. No manual seeding required.
- **Manual Seed:** Run `npm run seed` from the `backend/` directory if needed.

### Pincode Schema

| Field | Type | Description |
|-------|------|-------------|
| `officeName` | String | Name of the post office |
| `pincode` | String | 6-digit PIN code |
| `officeType` | String | Type of office (S.O., B.O., H.O.) |
| `deliveryStatus` | String | Delivery or Non-Delivery |
| `division` | String | Postal division |
| `region` | String | Postal region |
| `circle` | String | Postal circle |
| `taluk` | String | Taluk / sub-district |
| `district` | String | District name |
| `state` | String | State name |

---

## 🏗️ Architecture

```
┌─────────────────┐       HTTP        ┌─────────────────┐       Mongoose      ┌──────────────┐
│                 │    (Axios/REST)    │                 │      (ODM)          │              │
│   React + Vite  │ ◄──────────────►  │  Express API    │ ◄──────────────►    │   MongoDB    │
│   (Port 5173)   │                   │  (Port 5000)    │                     │              │
│                 │                   │                 │                     │              │
└─────────────────┘                   └─────────────────┘                     └──────────────┘
     Frontend                              Backend                              Database
```

---

## 👩‍💻 Author

**Rani Patel** — [GitHub](https://github.com/RaniPatel16)

---

## 📄 License

This project is licensed under the ISC License.