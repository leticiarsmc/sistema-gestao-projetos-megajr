const authService = require('../services/auth.service');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await authService.login(
      email,
      password
    );

    res.json(user);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
}

module.exports = {
  login,
};