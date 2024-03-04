// auth.js middleware
import jwt from 'jsonwebtoken';
import Users from '../models/auth.js';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authorization header is missing');
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData) {
      throw new Error('Invalid token');
    }

    const user = await Users.findById(decodedData.id);
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user; // Set the user information in req.user
    // console.log('User authenticated:', user);
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default auth;
