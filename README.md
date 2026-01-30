<<<<<<< HEAD
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
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
"# sky_experience-" 
"# sky_experience" 
"# skyexperience" 
"# skyexperience" 
"# skyExp" 
"# skyExp" 
>>>>>>> master
