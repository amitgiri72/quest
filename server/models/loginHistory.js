// models/LoginHistory.mjs

import mongoose from 'mongoose';

const loginHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loginTime: { type: Date, default: Date.now },
  ipAddress: { type: String, required: true },
  systemInfo: { type: String, required: true },
  // Add other fields as needed
});

const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);

export default LoginHistory;
