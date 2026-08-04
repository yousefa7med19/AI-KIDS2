function validateRegisterInput({ fullName, email, password }) {
  const errors = [];

  if (!fullName || !fullName.trim()) {
    errors.push('Full name is required');
  }

  if (!email || !email.trim()) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  return errors;
}

function validateLoginInput({ email, password }) {
  const errors = [];

  if (!email || !email.trim()) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  return errors;
}

module.exports = {
  validateRegisterInput,
  validateLoginInput
};