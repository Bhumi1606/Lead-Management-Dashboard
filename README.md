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

### Vercel Deployment

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
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   REACT_APP_API_URL=https://your-backend-url.vercel.app/api
   ```

4. **Deploy Backend Separately**
   - Create a new Vercel project for the backend
   - Root Directory: `backend`
   - Framework Preset: Other
   - Build Command: (leave empty or `npm install`)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

#### Option 2: Deploy Frontend and Backend Separately

**Backend Deployment:**
1. Create a new Vercel project
2. Set root directory to `backend`
3. Add environment variables: `MONGODB_URI`, `JWT_SECRET`
4. Deploy

**Frontend Deployment:**
1. Create a new Vercel project
2. Set root directory to `frontend`
3. Set build command: `npm run build`
4. Set output directory: `build`
5. Add environment variable: `REACT_APP_API_URL` (pointing to your backend URL)
6. Deploy

**Note:** After deploying backend, update `REACT_APP_API_URL` in frontend environment variables with the backend URL.

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
