const mongoose = require('mongoose');

const studentsPreRegisterSchema = new mongoose.Schema({
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
  monthlyIncome: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: {
      CISWOMAN: 'cis woman',
      TRANSWOMAN: 'trans woman',
    },
  },
  currentlyEmployed: {
    type: Boolean,
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

module.exports = mongoose.model('student-pre-register', studentsPreRegisterSchema);
