const crypto = require('crypto');

const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.CLIENT_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

module.exports = { authMiddleware, generateApiKey }; 