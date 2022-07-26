const bcrypt = require('bcryptjs');

exports.validateCPF = async (req, res, next) => {
  const { CPF } = req.body;
  try {
    if (CPF) {
      let sum = 0;
      let rest;

      // eslint-disable-next-line no-useless-escape
      if (!CPF.match('^[0-9]{3}(.)[0-9]{3}(.)[0-9]{3}(-)[0-9]{2}$')) {
        return res.status(422).json({
          message: 'Invalid CPF format. Please, check it and try again.',
          details: 'Use the format -> xxx.xxx.xxx-xx',
        });
      }

      const strCPF = String(CPF).replace(/[^\d]/g, '');

      if (strCPF.length !== 11) {
        return res.status(422).json({
          message: 'Invalid CPF number. Please, check it and try again.',
          details: 'A CPF number must be 11 digits long.',
        });
      }

      if (
        [
          '00000000000',
          '11111111111',
          '22222222222',
          '33333333333',
          '44444444444',
          '55555555555',
          '66666666666',
          '77777777777',
          '88888888888',
          '99999999999',
        ].indexOf(strCPF) !== -1
      ) {
        return res.status(422).json({
          message: 'Invalid CPF number. Please, check it and try again.',
          details: 'The CPF numbers cannot be the same.',
        });
      }

      for (let i = 1; i <= 9; i += 1) sum += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);

      rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) rest = 0;
      if (rest !== parseInt(strCPF.substring(9, 10), 10)) {
        return res.status(422).json({
          message: 'Invalid CPF number. Please, check it and try again.',
          details: 'This is not an acceptable CPF format.',
        });
      }

      sum = 0;

      for (let i = 1; i <= 10; i += 1) sum += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
      rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) rest = 0;
      if (rest !== parseInt(strCPF.substring(10, 11), 10)) {
        return res.status(422).json({
          message: 'Invalid CPF number. Please, check it and try again.',
          details: 'This is not an acceptable CPF format.',
        });
      }
      return next();
    }
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.validateEmailPasswordUsername = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    if (password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,20}$/;
      if (!password.match(passwordRegex)) {
        return res.status(406).json({
          message: 'The registration of a new user have failed',
          details:
            'Passwords must be a minimum of seven characters long and contain at least one uppercase and one lowercase letter (A, z), one numeric character (0-9), and one special character (such as !, %, @, or #).',
        });
      }
    }

    if (email) {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!email.match(emailRegex)) {
        return res.status(406).json({
          message: 'The registration of a new user have failed',
          details: `The e-mail ${email} does not match the e-mail format pattern`,
        });
      }
    }

    if (username) {
      const usernameRegex = '^[A-Za-z][A-Za-z0-9_]{7,20}$';

      if (!username.match(usernameRegex)) {
        return res.status(406).json({
          message: 'The registration of a new user have failed',
          details: `The username -${username}- does not match an acceptable format: It must start with letter. Must be 7 to 20 characters long. After the first character, numbers and underscores are allowed.`,
        });
      }
    }
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.hashPassword = async (req, res, next) => {
  try {
    if (req.body.password) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
      return next();
    }
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
