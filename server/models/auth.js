

// models/users.js
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  question: {
    type: String,
    default: "What is your best friend's name?",
  },
  answer: {
    type: String,
    required:true,
  },
  tags: {
    type: [String],
  },
  points: { type: Number, default: 0 },
  answersGiven: { type: Number, default: 0 },
  badges: [String],
  joinedOn: {
    type: Date,
    default: Date.now,
  },
  // upvotedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  // answeredQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});



export default mongoose.model('Users', userSchema);
