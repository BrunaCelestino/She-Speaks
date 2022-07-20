const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  classroomName: {
    type: String,
    required: true,
  },
  classroomIcon: {
    type: String,
  },
  teacher: {
    type: String,
    required: true,
  },
  classLink: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
  limitOfStudents: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ['english', 'spanish', 'german', 'italian', 'french', 'other'],
  },
  other: String,
  level: {
    type: String,
    required: true,
    enum: ['beginner', 'elementary', 'pre-Intermediate', 'intermediate', 'upper-Intermediate', 'advanced', 'proficient'],
  },
  learningFoccus: {
    type: [String],
    required: true,
    enum: ['grammar', 'listening', 'writing', 'conversation'],
  },
  DaysOfWeek: {
    type: [String],
    required: true,
    enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  },
  timeOfTheDay: {
    type: [String],
    required: true,
    enum: ['morning', 'afternoon', 'evening'],
  },
  students: {
    type: [Object],
  },
  status: {
    type: String,
    required: true,
    enum: ['empty', 'open', 'full', 'closed'],
    default: 'empty',
  },
}, { timestamps: true });

module.exports = mongoose.model('classroom', classroomSchema);
