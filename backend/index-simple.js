require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Use env variables for config
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// In-memory storage for demo purposes
let users = [];
let metrics = {
  tracked: 0,
  activeIssues: 0,
  maintenance: 0,
};

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Railway Backend API is running!' });
});

// Login Route
app.post('/api/login', async (req, res) => {
  console.log('Login request received:', req.body);
  const { username, password } = req.body;
  if (username && password) {
    // For demo purposes, accept any username/password
    const user = {
      name: username,
      profilePicture: null,
      id: username,
      email: username,
    };
    const token = jwt.sign({ name: user.name }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Login successful for user:', username);
    return res.json({ token, user });
  }
  console.log('Login failed - missing credentials');
  res.status(401).json({ message: 'Invalid credentials' });
});

// User (protected)
app.get('/api/user', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Metrics (protected)
app.get('/api/metrics', authenticateToken, (req, res) => {
  res.json(metrics);
});

// Update metrics (protected)
app.put('/api/metrics', authenticateToken, (req, res) => {
  const { tracked, activeIssues, maintenance } = req.body;
  if (tracked !== undefined) metrics.tracked = tracked;
  if (activeIssues !== undefined) metrics.activeIssues = activeIssues;
  if (maintenance !== undefined) metrics.maintenance = maintenance;
  res.json(metrics);
});

// Notifications (protected)
app.get('/api/notifications', authenticateToken, (req, res) => {
  const notifications = [
    {
      id: 1,
      title: 'Component Inspection Due',
      message: 'Component ABC-123 requires inspection',
      timestamp: new Date().toISOString(),
      type: 'inspection',
    },
    {
      id: 2,
      title: 'Maintenance Alert',
      message: 'Scheduled maintenance for DEF-456',
      timestamp: new Date().toISOString(),
      type: 'maintenance',
    },
  ];
  res.json(notifications);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Accessible at: http://localhost:${PORT}`);
  console.log(`Network access: http://192.168.29.134:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Secret key configured: ${process.env.SECRET_KEY ? 'Yes' : 'No'}`);
});
