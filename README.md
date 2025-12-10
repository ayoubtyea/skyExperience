# Sky Experience Project

This project is a full-stack web application for booking hot air balloon flights, built with React (frontend) and Node.js/Express (backend), using MongoDB for data storage. It includes admin and user features, image uploads via Cloudinary, and email notifications.

## Project Structure

- `web/` — React frontend
- `server/` — Node.js/Express backend
- `compose.yaml` — Docker Compose configuration
- `mongodb` — MongoDB database (containerized)

## Prerequisites

- Node.js 18+
- MongoDB Community Server **or** Docker Desktop (if you prefer containers)

## Local Development (without Docker)

1. Install MongoDB locally (e.g., with Homebrew: `brew install mongodb-community@7.0`).
2. Start MongoDB:
   ```bash
   brew services start mongodb-community@7.0
   ```
   The API will fall back to `mongodb://127.0.0.1:27017/skyexp` if `DATABASE_URL` is not set.
3. Copy the server env template:
   ```bash
   cd server
   cp env.example .env
   ```
   Update `ORIGIN`, `JWT_KEY`, Cloudinary, and email secrets as needed.
4. Run the backend:
   ```bash
   cd server
   npm install
   npm run dev
   ```
5. Run the frontend:
   ```bash
   cd web
   npm install
   npm start
   ```

## Docker Workflow

1. Clone the repository:
   ```bash
   git clone https://github.com/marouanedbibih/sky-experience
   cd sky-experience
   ```
2. Add environment variables:
   - Edit `server/.env` or `docker/.env.server` with your secrets (MongoDB, Cloudinary, email, etc.)
3. Build and start all services:

   ```bash
   docker compose up --build
   ```

   This will start:

   - MongoDB (port 27017)
   - Backend server (port 5000)
   - Frontend web app (port 3000)

4. Access the app:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)

## Useful Commands

- Stop all containers:
  ```bash
  docker compose down
  ```
- Rebuild containers:
  ```bash
  docker compose up --build
  ```

## Admin Dashboard Setup

After deploying to production (Render/Vercel), you need to create your first admin user to access the admin dashboard.

**📖 See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for detailed instructions.**

Quick method using cURL:

```bash
curl -X POST https://skyexperience-1.onrender.com/api/auth/admin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "your-email@example.com",
    "password": "YourSecurePassword123!"
  }'
```

Then log in at: `https://your-frontend-url/login`

## Notes

- Make sure your `.env` files are correctly set up before running.
- For development, you can run frontend and backend separately using `npm start` or `npm run dev` in their respective folders.
- The backend automatically defaults to a local MongoDB instance when `DATABASE_URL` is undefined, which is handy when working without Docker/Atlas.
- To create an admin user locally, use: `npm run create-admin` in the server directory.

## License

MIT
