const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  profilePicture: String,
  username: {
    type: String,
    required: true,
  },
  preRegister: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'student-pre-register',
  },
  chosenLanguage: {
    type: String,
    required: true,
    enum: ['english', 'spanish', 'german', 'italian', 'french', 'other'],
  },
  other: {
    type: mongoose.Mixed,
    default: false,
  },
  languageLevel: {
    type: String,
    required: true,
    enum: ['beginner', 'elementary', 'pre-Intermediate', 'intermediate', 'upper-Intermediate', 'advanced', 'proficient'],
  },
  learningInterest: {
    type: [String],
    required: true,
    enum: ['grammar', 'listening', 'writing', 'conversation'],
  },
  freeDaysOfWeek: {
    type: [String],
    required: true,
    enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  },
  timeOfTheDay: {
    type: [String],
    required: true,
    enum: ['morning', 'afternoon', 'evening'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  classroom: {
    type: mongoose.Types.ObjectId,
    ref: 'classroom',
  },
  friendsList: {
    type: [Object],
  },
  role: {
    type: String,
    required: true,
    default: 'student',
  },
  favorites: {
    type: [Object],
  },
  messages: [Object],
  token: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('student', studentSchema);
