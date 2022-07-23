const AdminSchema = require('../../models/admin/adminSchema');

const createNewAdmin = async (req, res) => {
  const { email, name } = req.body;

  const findAdminByEmail = await AdminSchema.exists({
    email: req.body.email,
  });

  if (findAdminByEmail) {
    return res.status(409).json({
      message: 'The registration of a new admin have failed',
      details: 'Conflict',
    });
  }

  try {
    const newAdmin = new AdminSchema({
      password: req.body.password,
      email,
      name,
    });

    await newAdmin.save();

    return res.status(201).json({
      message: 'New admin register successfully created',
      newAdmin,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  const {
    email, name,
  } = req.body;
  try {
    const adminFound = await AdminSchema.findById(req.params.id);

    if (adminFound === null) {
      return res.status(404).json({
        message: 'The user update have failed',
        details: 'Not Found.',
      });
    }

    if (email) {
      const findAdminByEmail = await AdminSchema.exists({
        email: req.body.email,
      });
      if (findAdminByEmail) {
        return res.status(409).json({
          message: 'The user update have failed',
          details: 'Conflict',
        });
      }
    }

    adminFound.email = email || adminFound.email;
    adminFound.name = name || adminFound.name;
    adminFound.password = req.body.password || adminFound.password;

    const savedAdmin = await adminFound.save();

    return res.status(200).json({
      message: 'User register successfully updated',
      savedAdmin,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminFound = await AdminSchema.findById(req.params.id);

    if (adminFound === null) {
      return res.status(404).json({
        message: 'It was not possible to delete the user register',
        details: 'Not Found',
      });
    }

    await adminFound.delete();

    return res.status(200).json({
      message: 'User successfully deleted',
      adminFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneAdminById = async (req, res) => {
  try {
    const adminFound = await AdminSchema.findById(req.params.id);

    if (adminFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find the user register',
        details: 'Not found.',
      });
    }
    return res.status(200).json({
      message: 'User successfully located',
      adminFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneAdminByEmail = async (req, res) => {
  try {
    const adminFound = await AdminSchema.findOne({
      email: req.query.email,
    });

    if (adminFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find the user register',
        details: 'Not found',
      });
    }

    return res.status(200).json({
      message: 'User successfully located.',
      adminFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    AdminSchema.find((error, admins) => {
      if (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
      return res.status(200).json(admins);
    });
    return res.status(500).json({ message: 'wr could not load the registers. Please, try again later ' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewAdmin,
  updateAdmin,
  deleteAdmin,
  getOneAdminById,
  getOneAdminByEmail,
  getAllAdmins,
};
