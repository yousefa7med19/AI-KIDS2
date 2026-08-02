require('dotenv').config();
const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = require('./src/app');
const { validateEnvironment } = require('./src/config/env');
const connectDatabase = require('./src/config/database');

validateEnvironment();

async function startServer() {
  try {
    // الاتصال بقاعدة البيانات
    await connectDatabase();

    const port = Number(process.env.PORT) || 5000;

    const server = app.listen(port, () => {
      console.log(`🚀 AI Kids API listening on http://localhost:${port}`);
    });

    function shutdown(signal) {
      console.log(`${signal} received. Closing server...`);
      server.close(() => process.exit(0));
    }

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();