const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  profilePicture: String,
  username: {
    type: String,
    required: true,
  },
  evaluation: {
    type: Number,
    default: 5.0,
    float: true,
    min: 0.0,
    max: 5.0,
  },
  preRegister: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'teacher-pre-register',
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
  LanguageLevelToTeach: {
    type: String,
    required: true,
    enum: ['beginner', 'elementary', 'pre-Intermediate', 'intermediate', 'upper-Intermediate', 'advanced', 'proficient'],
  },
  teachingInterest: {
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
  classrooms: {
    type: [mongoose.Types.ObjectId],
    ref: 'classroom',

  },
  friendsList: {
    type: [Object],
  },
  role: {
    type: String,
    required: true,
    default: 'teacher',
  },
  favorites: {
    type: [Object],
  },
  messages: [Object],
  token: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('teacher', teacherSchema);
