// controllers/auth.js

import LoginHistory from '../models/loginHistory.js';

// ... existing imports ...

export const getLoginHistory = async (req, res) => {
  try {
    const userId = req.params.userId; // Capture user ID from request parameters

    const loginHistory = await LoginHistory.find({ userId }).sort({ loginTime: -1 });

    res.status(200).json({ success: true, loginHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


