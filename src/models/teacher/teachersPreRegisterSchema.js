const mongoose = require('mongoose');

const teachersPreRegisterSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  fullName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  CPF: {
    type: String,
    required: true,
    unique: true,
  },
  profession: {
    type: String,
    required: true,
  },
  timeOfExperience: {
    type: String,
    required: true,
    enum: ['less than 1 year', '1 year', '2 years', '3 years', 'more than 3 years'],
  },
  gender: {
    type: String,
    required: true,
    enum: {
      CISWOMAN: 'cis woman',
      TRANSWOMAN: 'trans woman',
    },
  },
  resume: {
    type: String,
    required: true,
  },
  confirmInformation: {
    type: Boolean,
    required: true,
  },
  termsAndConditions: {
    type: Boolean,
    required: true,
  },
  applicationStatus: {
    type: String,
    enum: ['pending', 'approved', 'under-review', 'denied'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('teacher-pre-register', teachersPreRegisterSchema);
