const mongoose = require('mongoose')

const urlschema = new mongoose.Schema({
  shortID:{
    type: String,
    required: true,
    unique: true
  },
  redirectURL:{
    required: true,
    type: String,
    unique: true
  },
  visithistory:[{Timestamp:{ type:Number} }],
},
{Timestamp: true}
)

const URL = mongoose.model('URL',urlschema)

module.exports = URL;