// Import the bcrypt library npm i bcrypt
const bcrypt = require('bcrypt');

// Define a salt round for password hashing
const saltRounds = 10;

// Function to hash a password
const hashPassword = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    // Handle errors
    console.error('Error hashing password:', error);
    throw new Error('Error hashing password');
  }
};

// Function to compare a password with a hashed password(which is used in login))
const comparePassword = async (password, hashedPassword) => {
  try {
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    // Handle errors
    console.error('Error comparing password:', error);
    throw new Error('Error comparing password');
  }
};

module.exports = {
  hashPassword,
  comparePassword
};
