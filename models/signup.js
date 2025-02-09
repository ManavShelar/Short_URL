const mongoose = require('mongoose')

const signupschema = new mongoose.Schema({
  fullname:{
    type: String,
    required: true, 
  },
  email:{
    type: String,
    required: true,
    unique: true 
  },
  password:{
    type: String,
    required: true
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
  }
},
{Timestamp: true}
)

const signup = mongoose.model('signup',signupschema)

module.exports = signup;