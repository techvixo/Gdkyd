const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      unique: [true, 'Username already exists!'],
      required: [true, 'Username is required!'],
      match: /^[a-zA-Z0-9]+$/,
      minlength: [1, 'Username must be at least 1 character.'],
      maxlength: [20, 'Username is too long!'],
      validate: {
        validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
        message:
          'Username must only contain letters and numbers, without symbols or spaces!'
      }
    },
    email: {
      type: String,
      unique: [true, 'This email is already used!'],
      required: [true, 'Email is required!'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email!`
      }
    },
    phone: {
      type: String,
      unique: [true, 'This number is already used'],
      required: [true, 'Contact number is required!'],
      trim: true
    },
    password: {
      type: String,
      trim: true,
      minlength: [8, 'Password must be at least 8 characters'],
      required: [true, 'Password is required!']
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'blocked', 'disabled'],
      default: 'active'
    },
    image: {
      type: String,
      default: ''
    },
    verification: {
      code: {
        type: String,
        default: null
      },
      expireDate: {
        type: Date,
        default: null
      }
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }

  if (this.isModified('verification.code') && this.verification.code) {
    const saltRounds = 10;
    this.verification.code = bcrypt.hashSync(this.verification.code, saltRounds);
  }

  next();
});

userSchema.methods.comparePassword = function (userPlanePassword) {
  return bcrypt.compareSync(userPlanePassword, this.password)
}

userSchema.methods.compareVerificationCode = function (userPlaneCode) {
  return bcrypt.compareSync(userPlaneCode, this.verification.code)
}

const User = mongoose.model('user', userSchema)

module.exports = User
