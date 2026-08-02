const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');

const notFound = require('./middleware/not-found.middleware');
const errorHandler = require('./middleware/error.middleware');

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'https://yousefa7med19.github.io'
].filter(Boolean);

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'AI Kids API',
    healthCheck: '/api/health'
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
