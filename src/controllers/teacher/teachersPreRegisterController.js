const TeacherPreRegisterSchema = require('../../models/teacher/teachersPreRegisterSchema');

const createNewTeacherPreRegister = async (req, res) => {
  const {
    fullName,
    birthdate,
    CPF,
    profession,
    timeOfExperience,
    gender,
    resume,
    confirmInformation,
    termsAndConditions,
  } = req.body;

  try {
    const newTeacherPreRegister = new TeacherPreRegisterSchema({
      fullName,
      birthdate,
      CPF,
      profession,
      timeOfExperience,
      gender,
      resume,
      confirmInformation,
      termsAndConditions,
    });

    const findPreRegisterByCPF = await TeacherPreRegisterSchema.exists({
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
    await newTeacherPreRegister.save();

    if (
      newTeacherPreRegister.gender === 'trans woman' && newTeacherPreRegister.timeOfExperience === 'less than 1 year'
    ) {
      newTeacherPreRegister.applicationStatus = 'under-review';
      await newTeacherPreRegister.save();
      return res.status(201).json({
        message: 'Pre-register successfully created',
        newTeacherPreRegister,
        details:
          'Your request was received and now is under the admins review.',
        nextStep: `To check the status, please access: /teacher/pre-register/${newTeacherPreRegister.id}`,
      });
    }
    if (newTeacherPreRegister.timeOfExperience === 'less than 1 year' && newTeacherPreRegister.profession !== 'teacher') {
      newTeacherPreRegister.applicationStatus = 'denied';
      await newTeacherPreRegister.save();
      const newPreRegister = await TeacherPreRegisterSchema.find(newTeacherPreRegister).select('-_id');
      return res.status(201).json({
        message: 'Pre-register created! See -details- for more information',
        newPreRegister,
        details:
          'We have analyzed your request and, unfortunately, you are not qualified to register on the platform',
      });
    }
    if (newTeacherPreRegister.timeOfExperience === 'more than 3 years') {
      newTeacherPreRegister.applicationStatus = 'approved';
      await newTeacherPreRegister.save();
      return res.status(201).json({
        message: 'Pre-register successfully created',
        newTeacherPreRegister,
        details:
          'We have analyzed your request and we are happy to inform that you are qualified to register on the plataform',
        nextStep: `To sign up, access: /teacher/new-teacher/${newTeacherPreRegister.id}`,
      });
    }
    return res.status(201).json({
      message: 'Pre-register successfully created',
      newTeacherPreRegister,
      details: 'Your request was received and it is being proccessed.',
      nextStep: `To check the status, please access: /teacher/pre-register/${newTeacherPreRegister.id}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPreRegisterById = async (req, res) => {
  try {
    let preRegisterFound = await TeacherPreRegisterSchema.findById(req.params.id);

    if (preRegisterFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find the pre-register',
        details: 'Not Found',
      });
    }

    if (
      preRegisterFound.gender === 'trans woman' && preRegisterFound.profession !== 'teacher'
    && preRegisterFound.timeOfExperience === 'less than 1 year') {
      preRegisterFound.applicationStatus = 'denied';
      await preRegisterFound.save();

      preRegisterFound = await TeacherPreRegisterSchema.findById(req.params.id).select('-_id');

      return res.status(200).json({
        message: 'Pre-register found! See -details- for more information',
        preRegisterFound,
        details:
          'We have analyzed your request and, unfortunately, you are not qualified to register on the platform',
      });
    }

    if (
      preRegisterFound.applicationStatus === 'pending' && preRegisterFound.timeOfExperience === '1 year'
       && preRegisterFound.profession !== 'teacher' && preRegisterFound.gender === 'cis woman'
    ) {
      preRegisterFound.applicationStatus = 'denied';
      await preRegisterFound.save();
      preRegisterFound = await TeacherPreRegisterSchema.findById(req.params.id).select('-_id');
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
      nextStep: `To sign up, access: /teacher/new-teacher/${preRegisterFound.id}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// eslint-disable-next-line consistent-return
const getAllPreRegisters = async (req, res) => {
  try {
    TeacherPreRegisterSchema.find((error, preRegisters) => {
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
    timeOfExperience,
    gender,
    resume,
  } = req.body;
  try {
    const preRegisterFound = await TeacherPreRegisterSchema.findById(req.params.id);

    if (preRegisterFound === null) {
      return res.status(404).json({
        message: 'The pre-register update have failed',
        details: 'Not found',
      });
    }

    const findPreRegisterByCPF = await TeacherPreRegisterSchema.exists({
      CPF: req.body.CPF,
    });

    if (findPreRegisterByCPF) {
      return res.status(409).json({
        message: 'The registration of your pre-register have failed',
        details: 'Conflict',
      });
    }

    preRegisterFound.fullName = fullName || preRegisterFound.fullName;
    preRegisterFound.birthdate = birthdate || preRegisterFound.birthdate;
    preRegisterFound.CPF = CPF || preRegisterFound.CPF;
    preRegisterFound.profession = profession || preRegisterFound.profession;
    preRegisterFound.timeOfExperience = timeOfExperience || preRegisterFound.timeOfExperience;
    preRegisterFound.gender = gender || preRegisterFound.gender;
    preRegisterFound.resume = resume || preRegisterFound.resume;

    const savedPreRegister = await preRegisterFound.save();

    return res.status(200).json({
      message: 'Teacher pre-register successfully updated',
      savedPreRegister,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePreRegister = async (req, res) => {
  try {
    const TeacherPreRegisterFound = await TeacherPreRegisterSchema.findById(req.params.id);

    if (TeacherPreRegisterFound === null) {
      return res.status(404).json({
        message: 'It was not possible to delete the teacher pre-register',
        details: 'Not Found',
      });
    }

    await TeacherPreRegisterFound.delete();

    return res.status(200).json({
      message: `Teacher pre-register: ${TeacherPreRegisterFound.fullName}, successfully deleted`,
      TeacherPreRegisterFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createNewTeacherPreRegister,
  getPreRegisterById,
  getAllPreRegisters,
  updatePreRegister,
  deletePreRegister,
};
