const StudentsPreRegisterSchema = require('../../models/student/studentsPreRegisterSchema');

const createNewStudentPreRegister = async (req, res) => {
  const {
    fullName,
    birthdate,
    CPF,
    profession,
    monthlyIncome,
    gender,
    currentlyEmployed,
    confirmInformation,
    termsAndConditions,
  } = req.body;

  try {
    const newStudentsPreRegister = new StudentsPreRegisterSchema({
      fullName,
      birthdate,
      CPF,
      profession,
      monthlyIncome,
      gender,
      currentlyEmployed,
      confirmInformation,
      termsAndConditions,
    });

    const findPreRegisterByCPF = await StudentsPreRegisterSchema.exists({
      CPF: req.body.CPF,
    });

    if (findPreRegisterByCPF) {
      return res.status(409).json({
        message: 'The registration of your pre-register have failed',
        details: 'Conflict',
      });
    }

    if (confirmInformation === false || termsAndConditions === false) {
      return res.status(406).json({
        message: 'The registration of your pre-register have failed',
        details:
          'To create your pre-register, you need to confirm your information and accept The Terms and Conditions',
      });
    }
    await newStudentsPreRegister.save();

    const minimumWage = 1212;

    if (
      newStudentsPreRegister.gender === 'trans woman' && newStudentsPreRegister.monthlyIncome > minimumWage * 2
    ) {
      newStudentsPreRegister.applicationStatus = 'under-review';
      await newStudentsPreRegister.save();
      return res.status(201).json({
        message: 'Pre-register successfully created',
        newStudentsPreRegister,
        details:
          'Your request was received and now is under the admins review.',
        nextStep: `To check the status, please access: /student/pre-register/${newStudentsPreRegister.id}`,
      });
    }
    if (newStudentsPreRegister.monthlyIncome > minimumWage * 2) {
      newStudentsPreRegister.applicationStatus = 'denied';
      await newStudentsPreRegister.save();
      const newPreRegister = await StudentsPreRegisterSchema.find(newStudentsPreRegister).select('-_id');
      return res.status(201).json({
        message: 'Pre-register created! See -details- for more information',
        newPreRegister,
        details:
          'We have analyzed your request and, unfortunately, you are not qualified to register on the platform',
      });
    }
    if (newStudentsPreRegister.monthlyIncome < minimumWage) {
      newStudentsPreRegister.applicationStatus = 'approved';
      await newStudentsPreRegister.save();
      return res.status(201).json({
        message: 'Pre-register successfully created',
        newStudentsPreRegister,
        details:
          'We have analyzed your request and we are happy to inform that you are qualified to register on the plataform',
        nextStep: `To sign up, access: /student/new-student/${newStudentsPreRegister.id}`,
      });
    }
    return res.status(201).json({
      message: 'Pre-register successfully created',
      newStudentsPreRegister,
      details: 'Your request was received and it is being proccessed.',
      nextStep: `To check the status, please access: /student/pre-register/${newStudentsPreRegister.id}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPreRegisterById = async (req, res) => {
  try {
    let preRegisterFound = await StudentsPreRegisterSchema.findById(req.params.id);

    if (preRegisterFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find the pre-register',
        details: 'Not Found',
      });
    }

    const minimumWage = 1212;

    if (
      preRegisterFound.gender === 'trans woman' && preRegisterFound.monthlyIncome > minimumWage * 3.5
    ) {
      preRegisterFound.applicationStatus = 'denied';
      await preRegisterFound.save();

      preRegisterFound = await StudentsPreRegisterSchema.findById(req.params.id).select('-_id');

      return res.status(200).json({
        message: 'Pre-register found! See -details- for more information',
        preRegisterFound,
        details:
          'We have analyzed your request and, unfortunately, you are not qualified to register on the platform',
      });
    }

    if (
      preRegisterFound.applicationStatus === 'pending' && preRegisterFound.currentlyEmployed === true
    ) {
      preRegisterFound.applicationStatus = 'denied';
      await preRegisterFound.save();
      preRegisterFound = await StudentsPreRegisterSchema.findById(req.params.id).select('-_id');
      return res.status(200).json({
        message: 'Pre-register found! See -details- for more information',
        preRegisterFound,
        details:
          'We have analyzed your request and, unfortunately, you are not qualified to register on the platform',
      });
    }
    preRegisterFound.applicationStatus = 'approved';
    await preRegisterFound.save();
    return res.status(200).json({
      message: `Pre-register of the student: -${preRegisterFound.fullName}- successfully located.`,
      preRegisterFound,
      details:
        'We have analyzed your request and we are happy to inform that you are qualified to register on the plataform',
      nextStep: `To sign up, access: /student/new-student/${preRegisterFound.id}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// eslint-disable-next-line consistent-return
const getAllPreRegisters = async (req, res) => {
  try {
    StudentsPreRegisterSchema.find((error, preRegisters) => {
      if (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
      return res.status(200).json(preRegisters);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePreRegister = async (req, res) => {
  const {
    fullName,
    birthdate,
    CPF,
    profession,
    monthlyIncome,
    gender,
    currentlyEmployed,
  } = req.body;
  try {
    const preRegisterFound = await StudentsPreRegisterSchema.findById(req.params.id);

    if (preRegisterFound === null) {
      return res.status(404).json({
        message: 'The pre-register update have failed',
        details: 'Not Found',
      });
    }

    const findPreRegisterByCPF = await StudentsPreRegisterSchema.exists({
      CPF: req.body.CPF,
    });

    if (findPreRegisterByCPF) {
      return res.status(409).json({
        message: 'The update of your pre-register have failed',
        details: 'Conflict',
      });
    }

    preRegisterFound.fullName = fullName || preRegisterFound.fullName;
    preRegisterFound.birthdate = birthdate || preRegisterFound.birthdate;
    preRegisterFound.CPF = CPF || preRegisterFound.CPF;
    preRegisterFound.profession = profession || preRegisterFound.profession;
    preRegisterFound.monthlyIncome = monthlyIncome || preRegisterFound.monthlyIncome;
    preRegisterFound.gender = gender || preRegisterFound.gender;
    preRegisterFound.currentlyEmployed = currentlyEmployed || preRegisterFound.currentlyEmployed;

    const savedPreRegister = await preRegisterFound.save();

    return res.status(200).json({
      message: 'Student pre-register successfully updated',
      savedPreRegister,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePreRegister = async (req, res) => {
  try {
    const StudentsPreRegisterFound = await StudentsPreRegisterSchema.findById(req.params.id);

    if (StudentsPreRegisterFound === null) {
      return res.status(404).json({
        message: 'It was not possible to delete the student pre-register',
        details: 'Not Found',
      });
    }

    await StudentsPreRegisterFound.delete();

    return res.status(200).json({
      message: 'Student pre-register successfully deleted',
      StudentsPreRegisterFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createNewStudentPreRegister,
  getPreRegisterById,
  getAllPreRegisters,
  updatePreRegister,
  deletePreRegister,
};
