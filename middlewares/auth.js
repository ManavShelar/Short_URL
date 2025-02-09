const {getUser} = require('../service/auth') 

async function restrictLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies.uid;
  console.log(userUid);
  
  if(!userUid) return res.redirect("/login");
  const user = getUser(userUid)

  if(!user) return res.redirect("/login");

  req.user = user;
  next();
  }

  module.exports = {
    restrictLoggedInUserOnly,
  }