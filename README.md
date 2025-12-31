# Dr. Gaurav Jaswal Website

## Local Development Setup

### Prerequisites
- Node.js installed
- MongoDB (local or cloud instance)

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

2. **Create environment file:**
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

3. **Start the backend server:**
   Open a new terminal and run:
   ```bash
   npm run dev:server
   ```
   
   This will start the Express server on port 3001.

4. **Start the frontend:**
   In another terminal, run:
   ```bash
   npm run dev
   ```
   
   This will start Vite on port 5173.

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api

## Deployment to Vercel

### Environment Variables

Add these environment variables in your Vercel project settings:

1. `MONGO_URI` - Your MongoDB connection string
2. `ADMIN_PASSWORD` - Password for admin login
3. `ADMIN_API_KEY` - API key for automation access
4. `SESSION_SECRET` - Random string for session encryption
5. `NODE_ENV` - Set to `production`

### Deploy

```bash
vercel --prod
```

Or push to your connected GitHub repository for automatic deployment.

## Project Structure

- `/src` - Frontend React application
- `/api` - Vercel serverless functions (backend)
- `/server` - Local development backend server
- `/components` - React components
- `/lib` - Utility functions and API client

## API Endpoints

### Public
- `GET /api/blogs` - Get all blogs

### Admin (requires authentication)
- `POST /api/login` - Admin login
- `POST /api/logout` - Admin logout
- `GET /api/auth/status` - Check auth status
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Automation (requires API key)
- `POST /api/admin/blogs` - Create blog via API
- `PUT /api/admin/blogs/:id` - Update blog via API
- `DELETE /api/admin/blogs/:id` - Delete blog via API
