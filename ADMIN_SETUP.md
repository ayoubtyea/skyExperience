# Admin Dashboard Setup Guide

This guide explains how to create your first admin user and log in to the admin dashboard after deploying to Render and Vercel.

## Method 1: Create Admin via API (Recommended for Production)

Since your backend is deployed on Render, you can create the first admin user directly via the API endpoint.

### Option A: Using cURL (Terminal/Command Line)

```bash
curl -X POST https://skyexperience-1.onrender.com/api/auth/admin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "your-email@example.com",
    "password": "YourSecurePassword123!"
  }'
```

Replace:

- `your-email@example.com` with your actual email
- `YourSecurePassword123!` with a strong password (min 8 characters)

### Option B: Using Postman or Insomnia

1. Create a new POST request
2. URL: `https://skyexperience-1.onrender.com/api/auth/admin`
3. Headers: `Content-Type: application/json`
4. Body (JSON):

```json
{
  "username": "admin",
  "email": "your-email@example.com",
  "password": "YourSecurePassword123!"
}
```

### Option C: Using Browser Console (JavaScript)

Open your browser console on your deployed frontend and run:

```javascript
fetch("https://skyexperience-1.onrender.com/api/auth/admin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "admin",
    email: "your-email@example.com",
    password: "YourSecurePassword123!",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
```

## Method 2: Using the Script (Local Development Only)

If you're running the server locally:

```bash
cd server
node scripts/createAdmin.js [username] [email] [password]
```

Example:

```bash
node scripts/createAdmin.js admin admin@skyexperience.com MyPassword123!
```

If you don't provide arguments, it will use defaults:

- Username: `admin`
- Email: `admin@skyexperience.com`
- Password: `Admin123!`

## Logging In to Admin Dashboard

After creating your admin account:

1. **Navigate to the login page:**

   - Go to: `https://your-frontend-url.vercel.app/login`
   - Or: `https://your-frontend-url.onrender.com/login`

2. **Enter your credentials:**

   - Email: The email you used when creating the admin account
   - Password: The password you set

3. **Click "Sign In"**

4. **You'll be redirected to:** `/admin` (Admin Dashboard)

## Troubleshooting

### "Invalid credentials" error

- Double-check your email and password
- Make sure you created the admin account first
- Check that the email is in lowercase (it's automatically lowercased)

### CORS errors

- Make sure your frontend URL is added to the `ORIGIN` environment variable in Render
- The CORS configuration should allow your frontend domain

### Can't access the API

- Verify your backend is running: `https://skyexperience-1.onrender.com/health`
- Check Render logs for any errors
- Ensure all environment variables are set correctly in Render

### Cookie issues

- Make sure `withCredentials: true` is set in axios requests (already configured)
- Check that your frontend and backend are on compatible domains
- In production, cookies require HTTPS

## Security Notes

⚠️ **Important:**

- After creating your first admin, consider enabling the admin check in `AuthController.js` (uncomment lines 156-161)
- Change the default password immediately after first login
- Use a strong password (min 8 characters, mix of letters, numbers, and symbols)
- Keep your admin credentials secure

## Environment Variables Required

Make sure these are set in your Render backend service:

- `DATABASE_URL` - MongoDB connection string
- `JWT_KEY` - Secret key for JWT tokens
- `ORIGIN` - Your frontend URL(s), comma-separated
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `MAIL_USER` - Email for sending notifications
- `MAIL_PASS` - Email password
