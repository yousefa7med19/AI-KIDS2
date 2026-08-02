const requiredInProduction = ['JWT_SECRET', 'MONGODB_URI'];

function validateEnvironment() {
  if (process.env.NODE_ENV !== 'production') return;

  const missing = requiredInProduction.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = { validateEnvironment };
