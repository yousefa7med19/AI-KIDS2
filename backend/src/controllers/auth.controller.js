const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/email');
const {
  validateRegisterInput,
  validateLoginInput
} = require('../validators/auth.validator');

async function getUsersCount(req, res, next) {
  try {
    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      success: true,
      totalUsers
    });
  } catch (error) {
    next(error);
  }
}

function createToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

async function register(req, res, next) {
  try {
    const { fullName, email, password } = req.body;

    const validationErrors = validateRegisterInput({
  fullName,
  email,
  password
});

if (validationErrors.length) {
  return res.status(400).json({
    success: false,
    message: validationErrors[0],
    errors: validationErrors
  });
}

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const validationErrors = validateLoginInput({
  email,
  password
});

if (validationErrors.length) {
  return res.status(400).json({
    success: false,
    message: validationErrors[0],
    errors: validationErrors
  });
}

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}
async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail
    });

    // نفس الرسالة في الحالتين لحماية بيانات المستخدمين
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account exists, a reset link has been created'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl =
  `http://127.0.0.1:5500/frontend/pages/reset-password.html?token=${resetToken}`;

await sendPasswordResetEmail({
  to: user.email,
  resetUrl
});

return res.status(200).json({
  success: true,
  message: 'Password reset email sent successfully.'
});
  } catch (error) {
    next(error);
  }
}
async function resetPassword(req, res, next) {
  try {
    const crypto = require('crypto');

    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

if (!req.body.password || req.body.password.length < 8) {
  return res.status(400).json({
    success: false,
    message: 'Password must be at least 8 characters'
  });
}

user.password = await bcrypt.hash(req.body.password, 12);    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    next(error);
  }
}

async function getUsersCount(req, res, next) {
  try {

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
     getUsersCount
};