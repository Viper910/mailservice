const { default: mongoose, Mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  phonenumber: {
    type: String,
    require: true,
  },
  inbox: [
    {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      important: {
        type: Boolean,
        required: false,
      },
    },
    {
      timestamps: true,
    },
  ],
  sent: [
    {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      important: {
        type: Boolean,
        required: false,
      },
    },
    {
      timestamps: true,
    },
  ],
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
