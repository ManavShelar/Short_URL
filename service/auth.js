const jwt = require('jsonwebtoken')
const secret = "Manav@#!$69"

function setUser(user) {
  return jwt.sign(
    { 
      _id: user.id,
      name: user.fullname,
      email: user.email
    },
    secret
  );
}

function getUser(token) {
  if(!token) return null;
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
}