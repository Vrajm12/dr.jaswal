require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

const isProd = process.env.NODE_ENV === 'production';


/* =======================
   CORS
   ======================= */

const allowedOrigins = [
  // Production
  'https://www.drgauravjaswal.com',
  'https://drgauravjaswal.com',
  'https://dr-gaurav-jaswal-website.vercel.app/',

  // Local development
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(cors({
  origin(origin, callback) {
    // Allow Postman / server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error('❌ CORS blocked:', origin);
    // IMPORTANT: do NOT throw hard error
    return callback(null, false);
  },
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

/* =======================
   SESSION CONFIG
   ======================= */
// REQUIRED when behind Vercel / Render / any proxy
app.set('trust proxy', 1);

app.use(session({
  name: 'admin.sid',
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  proxy: true, // 🔴 REQUIRED
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));


/* =======================
   MONGODB
   ======================= */
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/blog';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

/* =======================
   BLOG MODEL
   ======================= */
const blogSchema = new mongoose.Schema({
  title: String,
  category: String,
  content: String,
  featured: Boolean,
  image: String,
  date: { type: Date, default: Date.now },
  author: { type: String, default: 'Dr. Gaurav Jaswal' },
  readTime: String,
  tags: [String],
  excerpt: String,
});

const Blog = mongoose.model('Blog', blogSchema);

/* =======================
   AUTH MIDDLEWARES
   ======================= */
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) return next();
  return res.status(401).json({ message: 'Unauthorized' });
};

const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ message: 'API key missing' });
  }

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ message: 'Invalid API key' });
  }

  next();
};

/* =======================
   AUTH ROUTES (ADMIN UI)
   ======================= */

// LOGIN
app.post('/api/login', (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    req.session.isAuthenticated = true;
    return res.json({ success: true });
  }

  res.status(401).json({ success: false });
});

// LOGOUT
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('admin.sid');
    res.json({ success: true });
  });
});

// AUTH STATUS
app.get('/api/auth/status', (req, res) => {
  res.json({ isAuthenticated: !!req.session.isAuthenticated });
});

/* =======================
   BLOG ROUTES (PUBLIC + UI)
   ======================= */

// GET BLOGS (PUBLIC)
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 });
  res.json(blogs);
});

// CREATE BLOG (ADMIN UI)
app.post('/api/blogs', isAuthenticated, async (req, res) => {
  const { title, category, content, featured, image } = req.body;

  const excerpt = content.slice(0, 100) + '...';
  const readTime = Math.ceil(content.split(' ').length / 200) + ' min read';

  const blog = await Blog.create({
    title,
    category,
    content,
    featured,
    image,
    excerpt,
    readTime,
    tags: [category],
  });

  res.status(201).json(blog);
});

// UPDATE BLOG
app.put('/api/blogs/:id', isAuthenticated, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
});

// DELETE BLOG
app.delete('/api/blogs/:id', isAuthenticated, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* =======================
   ADMIN API (n8n / AUTOMATION)
   ======================= */

app.post('/api/admin/blogs', verifyApiKey, async (req, res) => {
  const { title, category, content, featured, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content required' });
  }

  const excerpt = content.slice(0, 100) + '...';
  const readTime = Math.ceil(content.split(' ').length / 200) + ' min read';

  const blog = await Blog.create({
    title,
    category,
    content,
    featured: !!featured,
    image,
    excerpt,
    readTime,
    tags: [category],
  });

  res.status(201).json({ success: true, blogId: blog._id });
});

app.put('/api/admin/blogs/:id', verifyApiKey, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json({ success: true });
});

app.delete('/api/admin/blogs/:id', verifyApiKey, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* =======================
   START SERVER
   ======================= */
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
