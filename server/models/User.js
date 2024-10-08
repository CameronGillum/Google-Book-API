const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const bookSchema = new Schema({
  bookId: {
    type: String,
    required: true,
  },
  authors: [String],
  description: String,
  title: {
    type: String,
    required: true,
  },
  image: String,
  link: String,
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedBooks: [bookSchema],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
