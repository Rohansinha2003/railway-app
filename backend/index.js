require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Use env variables for config
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/railway', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schemas & Models
const MetricsSchema = new mongoose.Schema({
  tracked: Number,
  activeIssues: Number,
  maintenance: Number,
});
const Metrics = mongoose.model('Metrics', MetricsSchema);

const NotificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  date: String,
});
const Notification = mongoose.model('Notification', NotificationSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  profilePicture: String,
});
const User = mongoose.model('User', UserSchema);

const ReportSchema = new mongoose.Schema({
  title: String,
  status: String,
  date: String,
});
const Report = mongoose.model('Report', ReportSchema);

const GrievanceSchema = new mongoose.Schema({
  description: String,
  photo: String,
  status: String,
  date: String,
});
const Grievance = mongoose.model('Grievance', GrievanceSchema);

const SamplePartSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  status: String,
  lastInspected: String,
});
const SamplePart = mongoose.model('SamplePart', SamplePartSchema);

// Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Helper to wrap async route handlers and catch errors
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Metrics
app.get(
  '/api/metrics',
  asyncHandler(async (req, res) => {
    const metrics = await Metrics.findOne();
    res.json(metrics || { tracked: 0, activeIssues: 0, maintenance: 0 });
  })
);

// Notifications
app.get(
  '/api/notifications',
  asyncHandler(async (req, res) => {
    const notifications = await Notification.find();
    res.json(notifications);
  })
);

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // Try to find user by name or email
    let user = await User.findOne({ name: username });
    if (!user) {
      user = {
        name: username,
        profilePicture: null,
        id: username,
        email: username,
      };
    } else {
      user = {
        ...user.toObject(),
        id: user._id ? user._id.toString() : username,
        email: username,
      };
    }
    const token = jwt.sign({ name: user.name }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token, user });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// User (protected)
app.get(
  '/api/user',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const user = await User.findOne();
    res.json(user || { name: 'Inspector', profilePicture: null });
  })
);

// Reports & Alerts
app.get(
  '/api/reports',
  asyncHandler(async (req, res) => {
    const reports = await Report.find();
    res.json(reports);
  })
);

// Public Grievance
app.get(
  '/api/grievances',
  asyncHandler(async (req, res) => {
    const grievances = await Grievance.find();
    res.json(grievances);
  })
);
app.post(
  '/api/grievances',
  asyncHandler(async (req, res) => {
    const { description, photo } = req.body;
    const newGrievance = new Grievance({
      description,
      photo: photo || null,
      status: 'Open',
      date: new Date().toISOString().slice(0, 10),
    });
    await newGrievance.save();
    res.status(201).json(newGrievance);
  })
);

// Sample Part Detail
app.get(
  '/api/sample-part',
  asyncHandler(async (req, res) => {
    const part = await SamplePart.findOne();
    res.json(
      part || {
        id: 'sample123',
        name: 'Brake Pad',
        description: 'High-quality brake pad for wagon.',
        status: 'Operational',
        lastInspected: '2024-05-30',
      }
    );
  })
);

// Logout Route (stateless JWT: client should delete token)
app.post('/api/logout', (req, res) => {
  // No server-side action for stateless JWT logout
  res.json({ message: 'Logged out successfully' });
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
