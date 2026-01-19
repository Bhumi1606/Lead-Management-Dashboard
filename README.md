# Lead Management Dashboard

A full-stack CRM-style dashboard for managing leads with search, filters, sorting, pagination, and analytics.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## Features

- 🔐 Basic authentication
- 📊 Leads management with search, filters, sorting, and pagination
- 📈 Analytics dashboard (Total leads, Converted leads, Leads by stage)
- 📱 Mobile-responsive design
- 🔍 Server-side search and filtering
- 📄 Lead details view

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- Git

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Backend Setup

```bash
cd backend
npm install
npm run seed  # Seed 300-1000 dummy leads
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
# For local development
REACT_APP_API_URL=http://localhost:5000/api

# For production (after deploying backend)
REACT_APP_API_URL=https://lead-management-dashboard-63qc.onrender.com/api
```

Then start the frontend:

```bash
npm start
```

## Seeding Data

To seed the database with dummy leads:

```bash
cd backend
npm run seed
```

This will create 500 dummy leads with various stages, statuses, and dates.

## Deployment

### Backend Deployment (Render)

1. **Create a Web Service on Render**
   - Go to [Render](https://render.com) and create a new Web Service
   - Connect your GitHub repository
   - Configure settings:
     - **Root Directory**: `backend`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

2. **Set Environment Variables in Render Dashboard**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Deploy and get your backend URL**
   - After deployment, Render will provide a URL like: `https://your-service.onrender.com`
   - Test the API: `https://your-service.onrender.com/api/health`

### Frontend Deployment (Vercel)

#### Option 1: Deploy as Monorepo (Recommended)

1. **Connect Repository to Vercel**
   - Go to [Vercel](https://vercel.com) and import your GitHub repository
   - Select the root directory

2. **Configure Build Settings**
   - Root Directory: Leave as root
   - Framework Preset: Other
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/build`
   - Install Command: `cd frontend && npm install`

3. **Set Environment Variables in Vercel Dashboard**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual Render backend URL)

**Note:** Make sure to update `REACT_APP_API_URL` in Vercel environment variables with your Render backend URL after deployment.

## Demo Credentials

- **Username**: admin
- **Password**: admin123

## API Endpoints

- `GET /api/leads` - Get leads with search, filter, sort, pagination
- `GET /api/leads/:id` - Get lead details
- `POST /api/auth/login` - Login

## Project Structure

```
Lead-Management-Dashboard/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── README.md
```
